import type { NextPage } from 'next'
import Head from 'next/head'
import ConnectWallet from '../components/ConnectWallet'
import { Suspense, useEffect } from 'react'
import { useAtom } from 'jotai'
import { asyncMessagesAtom, contractAtom, selectedAddressAtom } from '../jotai/atoms'
import Message from '../components/Message'
import SendBox from '../components/SendBox'

const Home: NextPage = () => {

  const [selectedAddress] = useAtom(selectedAddressAtom)
  const [messages, refreshMessages] = useAtom(asyncMessagesAtom)
  const [contract] = useAtom(contractAtom)


  useEffect(() => {
    if (!contract) {
      return
    }

    const listener = (arg1: any, arg2: any, arg3: any) => {
      // console.log('contract event')
      // console.log('arg1', arg1)
      // console.log('arg2', arg2)
      // console.log('arg3', arg3)

      refreshMessages()
    }

    contract.on('NewMessage', listener)

    return () => {
      contract.off('NewMessage', listener)
    }
  }, [contract])

  if (!selectedAddress) {
    return (
      <ConnectWallet />
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Message Board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>
        We are using Rinkeby testnet
      </h1>

      <Suspense fallback="Loading...">
        <main
          className="flex w-full flex-1 flex-col items-center justify-center px-20 bg-gray-100">

          <SendBox />

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
    </div>
  )
}

export default Home
