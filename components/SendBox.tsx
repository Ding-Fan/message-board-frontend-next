import { useAtom } from 'jotai'
import React from 'react'
import { CMessageBoardAtom, messageAtom } from '../jotai/atoms'

type Props = {}

const SendBox = (props: Props) => {

  const [message, setMessage] = useAtom(messageAtom)
  const [CMessageBoard] = useAtom(CMessageBoardAtom)

  const doSaveMessage = async () => {
    if (!CMessageBoard) {
      return
    }
    const transaction = await CMessageBoard.saveMessage(message)
    await transaction.wait()
  }

  const onMessageChange = (event: any) => {
    setMessage(event.target.value)
  }

  return (
    <div className='flex '>
      <input
        className="border-4 border-red w-full"
        type="text" name="" id="" onChange={onMessageChange} />
      <button
        className="border-2 rounded-xl border-red mt-6"
        onClick={doSaveMessage}>Save message</button>
    </div>
  )
}

export default SendBox