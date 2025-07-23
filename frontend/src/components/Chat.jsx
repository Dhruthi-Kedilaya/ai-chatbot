import React, { useEffect } from 'react'
import { Messages } from './Messages'
import Input from './Input'
import { useMsgStore } from '../store/msgStore'

const Chat = () => {
    const { messages, getAllMsgs } = useMsgStore();
    useEffect(()=>{
        getAllMsgs();
    },[ getAllMsgs]);
    console.log(messages);
  return (
        <div className="flex flex-col h-screen overflow-hidden">
      {/* Messages section that scrolls */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <Messages />
      </div>

      {/* Input stays at the bottom */}
      <div className="shrink-0 border-t border-gray-300 ">
        <Input />
      </div>
    </div>
  )
}

export default Chat