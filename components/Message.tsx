import React from 'react'

type Props = {
  content: string
  sender: string
}

function Message({ content, sender }: Props) {
  return (
    <div className="flex-col mb-3 " >
      <div className="text-cyan-700">
        {sender}
      </div>
      <div className="rounded-xl p-2 min-h-[70px] w-full bg-cyan-500">
        {content}
      </div>
    </div>
  )
}

export default Message