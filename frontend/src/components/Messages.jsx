import React, { useEffect, useRef } from "react";
import { useMsgStore } from "../store/msgStore";

export const Messages = () => {
  const { messages, getAllMsgs } = useMsgStore();
  const endRef = useRef(null);

  useEffect(()=>{
    if(endRef){
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  },[endRef, messages]);

  return (
    <div>
      {messages.length==0?(
        <div className="text-center text-gray-500 mt-10">
        <p className="text-3xl">💬 Start the conversation by saying something!</p>
        <p className="text-lg mt-2">Your messages will appear here.</p>
      </div>
      ):(
        messages.map((msg, index) => (
        <div className={`chat ${msg.sender=="user"?"chat-end":"chat-start"} `} ref={endRef} key={index}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={msg.sender=="user"? "./me.jpg":"./ai.webp"}
              />
            </div>
          </div>
          <div className="chat-header">
            {msg.sender=="user"?"You":"Ai assistant"}
          </div>
          <div className={`chat-bubble whitespace-pre-line ${msg.sender=="user"?"bg-primary text-primary-content":""}`}>{msg.text}</div>
        </div>
      ))
      )}
      
    </div>
  );
};
