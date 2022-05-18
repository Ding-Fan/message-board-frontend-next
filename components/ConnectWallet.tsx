import React from 'react'
import { ethers } from 'ethers'

import TokenArtifact from "../contract-info/MessageBoard.json"
import { useAtom } from 'jotai'
import { contractAtom, selectedAddressAtom } from '../jotai/atoms'

type Props = {
}

const ConnectWallet = (props: Props) => {

  const [contract, setContract] = useAtom(contractAtom)
  const [selectedAddress, setSelectedAddress] = useAtom(selectedAddressAtom)

  const _initializeEthers = async () => {
    // We first initialize ethers by creating a provider using window.ethereum
    const _provider = new ethers.providers.Web3Provider(window.ethereum)

    // Then, we initialize the contract using that provider and the token's
    // artifact. You can do this same thing with your contracts.
    const theContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
      TokenArtifact.abi,
      _provider.getSigner(0)
    )

    setContract(theContract)
  }

  const _connectWallet = async () => {
    // This method is run when the user clicks the Connect. It connects the
    // dapp to the user's wallet, and initializes it.

    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.
    const [userAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' })

    setSelectedAddress(userAddress)

    _initializeEthers()

  }


  return (
    <div className="col-6 p-4 text-center">
      <p>Please connect to your wallet.</p>
      <button
        className="btn btn-warning rounded-xl bg-yellow-500 text-5xl"
        type="button"
        onClick={_connectWallet}
      >
        Connect Wallet
      </button>
    </div>
  )
}

export default ConnectWallet