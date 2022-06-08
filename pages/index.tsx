import type { NextPage } from 'next'
import Head from 'next/head'
import ConnectWallet from '../components/ConnectWallet'
import { Suspense, useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { asyncMessagesAtom, CMessageBoardAtom, CNFTAtom, selectedAddressAtom } from '../jotai/atoms'
import Message from '../components/Message'
import SendBox from '../components/SendBox'
import { useMask } from '../context/MaskContext'
import toast, { Toaster } from 'react-hot-toast'

const Home: NextPage = () => {

  const { setHasMask } = useMask()
  const [selectedAddress] = useAtom(selectedAddressAtom)
  const [messages, refreshMessages] = useAtom(asyncMessagesAtom)
  const [CMessageBoard] = useAtom(CMessageBoardAtom)
  const [CNFT] = useAtom(CNFTAtom)

  useEffect(() => {

    setHasMask(true)
    const id = setTimeout(() => {
      setHasMask(false)
    }, 3000)

    return () => {
      clearTimeout(id)
    }
  }, [])

  useEffect(() => {
    if (!CMessageBoard) {
      return
    }

    const listener = (arg1: any, arg2: any, arg3: any) => {
      // console.log('CMessageBoard event')
      // console.log('arg1', arg1)
      // console.log('arg2', arg2)
      // console.log('arg3', arg3)

      refreshMessages()
    }

    CMessageBoard.on('NewMessage', listener)

    return () => {
      CMessageBoard.off('NewMessage', listener)
    }
  }, [CMessageBoard])

  useEffect(() => {

    if (!CNFT) {
      return
    }

    const listener = (arg1: any, arg2: any, arg3: any) => {
      console.log('arg1', arg1)
      console.log('arg2', arg2)
      console.log('arg3', arg3)

      // toast(
      //   <div>
      //     Hey there! We've minted your NFT. It may be blank right now.It can take a max of 10 min to show up on OpenSea. Here's the link:
      //     <a target="_blank">
      //       {`<https://testnets.opensea.io/assets/${arg1}/${arg2}>`}
      //     </a>
      //   </div>
      //   , {
      //     duration: 50000,
      //     style: {
      //       width: "80vw"
      //     },
      //     icon: "💸💸"
      //   })

      alert(`<https://testnets.opensea.io/assets/${process.env.NEXT_PUBLIC_CNFT_ADDRESS}/${arg2}>`)

    }

    CNFT.on('NFTMinted', listener)

    return () => {
      CNFT.off('NFTMinted', listener)
    }
  }, [CNFT])

  const doToOpensea = () => {
    window.open(
      `https://testnets.opensea.io/collection/${process.env.NEXT_PUBLIC_NFT_COLLECTION_OPENSEA}`, '_blank')
  }

  const doMintNFT = async () => {
    if (!CNFT) {
      return
    }

    const txn = await CNFT.makeNft()
    console.log('making nft')
    await txn.wait()
    console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${txn.hash}`)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Message Board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className='w-full text-center text-2xl bg-green-200 py-4'>
        We are using Rinkeby testnet
      </h1>

      {
        !selectedAddress ? (
          <ConnectWallet />
        ) : (
          <Suspense fallback="Loading...">
            <main
              className="flex w-full flex-1 flex-col items-center justify-center px-20 bg-gray-100">

              <SendBox />

              <button className='bg-black text-white rounded-lg p-2 m-2' onClick={doMintNFT}>
                Mint a NFT
              </button>

              <button className='bg-black text-white rounded-lg p-2 m-2' onClick={doToOpensea}>
                See this NFT collection on Opensea
              </button>

              <div
                className="message-list w-full min-h-[200px] ">
                {
                  messages && messages.map((item) => {
                    return (
                      <Message
                        content={item.content}
                        sender={item.sender}
                        key={item.content + Date.now()} />
                    )
                  })
                }
              </div>
            </main>
          </Suspense>
        )
      }

      <Toaster />
    </div>
  )
}

export default Home
