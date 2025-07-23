import React from 'react'
import Navbar from './components/Navbar'
import Chat from './components/Chat'
import { Toaster } from 'react-hot-toast'
import { useMsgStore } from './store/msgStore'

const App = () => {
  const {theme}=useMsgStore();
  return (
    <div className="h-screen flex flex-col" data-theme={theme}>
      <Navbar />
      <Chat />
      <Toaster />
    </div>
  )
}

export default App