import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import SDK from 'youbet-sdk'

const sdk = new SDK({ providerUrl: 'https://rpc.sepolia.linea.build' });

function Punch() {
  const [isPunched, setIsPunched] = useState(false)

  const handlePunch = () => {
    // Perform punch logic here
    // Call an API or update a database to mark the punch
    // Set isPunched to true if the punch is successful
    setIsPunched(true)
  }
  return (<>
    <button onClick={handlePunch} disabled={isPunched}>
      {isPunched ? '已打卡' : '打卡'}
    </button>
  </>)
}

function App() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    sdk.getContractOwner().then((goals) => {
      console.log(goals)
    })
  }, [isHydrated])

  return (
    <div>
      <Punch />
      <Punch />
      <Punch />
      <Punch />
      <Punch />
      <Punch />
      <Punch />
    </div>
  )
}


export default App
