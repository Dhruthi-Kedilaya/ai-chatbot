import React, { useState } from 'react'
import { Send } from 'lucide-react';
import { useMsgStore } from '../store/msgStore';

const Input = () => {
    const {sendMsg}=useMsgStore();
    const [message,setMessage] = useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!message)return;
        sendMsg(message);
        setMessage("");
    }
  return (
    <div className='flex items-center gap-2 p-4'>
        <input type='text' 
        placeholder='Type your message here...'
        className='input flex-1 input-bordered w-full'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
    />
    <button className='btn btn-primary' onClick={handleSubmit} disabled={!message}>
        <Send className='w-6 h-6' />
    </button>
    </div>
  )
}

export default Input