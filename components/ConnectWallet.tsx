import React, { useEffect } from 'react'
import { ethers } from 'ethers'
import Web3Modal from "web3modal"

import CMessageBoardTokenArtifact from "../contract-info/MessageBoard.json"
import CNFTArtifact from "../contract-info/NftCollection.json"
import { useAtom } from 'jotai'
import { CMessageBoardAtom, CNFTAtom, selectedAddressAtom, web3ModalAtom } from '../jotai/atoms'
import { getFontDefinitionFromNetwork } from 'next/dist/server/font-utils'
import { getChainData } from '../helpers/utilities'
import toast from 'react-hot-toast'

type Props = {
}

const ConnectWallet = (props: Props) => {

  const [CMessageBoard, setCMessageBoard] = useAtom(CMessageBoardAtom)
  const [CNFT, setCNFT] = useAtom(CNFTAtom)
  const [selectedAddress, setSelectedAddress] = useAtom(selectedAddressAtom)
  const [web3Modal, setWeb3Modal] = useAtom(web3ModalAtom)

  useEffect(() => {

    // const getNetwork = () => getChainData(chainId).network.toLowerCase()

    const theModal = new Web3Modal({
      cacheProvider: true,
      providerOptions: {
        // walletconnect: {
        //   package: 'metamask',
        //   options: {
        //     infuraId: process.env.NEXT_PUBLIC_INFURA_ID || ""
        //   }
        // }
      }
    })

    setWeb3Modal(theModal)

    return () => {
    }
  }, [])


  const _initializeEthers = async () => {

    const instance = await web3Modal?.connect()

    console.log('instance', instance)

    // We first initialize ethers by creating a provider using window.ethereum
    const _provider = new ethers.providers.Web3Provider(instance)

    const _signer = _provider.getSigner()

    const _chainId = await _signer.getChainId()

    console.log('chain id', _chainId)

    try {
      getChainData(_chainId)
    } catch (error) {
      toast.error('We are using Rinkeby test network!')
      setSelectedAddress("")
      return
    }


    // Then, we initialize the contract using that provider and the token's
    // artifact. You can do this same thing with your contracts.
    const theCMessageBoard = new ethers.Contract(
      process.env.NEXT_PUBLIC_CMESSAGEBOARD_ADDRESS || "",
      CMessageBoardTokenArtifact.abi,
      _provider.getSigner(0)
    )
    const theCNFT = new ethers.Contract(
      process.env.NEXT_PUBLIC_CNFT_ADDRESS || "",
      CNFTArtifact.abi,
      _provider.getSigner(0)
    )

    setCMessageBoard(theCMessageBoard)
    setCNFT(theCNFT)
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