import { useEffect, useState } from 'react'
import './App.css'

import { SDK, NetworkType } from 'youbet-sdk'
const sdk = new SDK({ networkType: NetworkType.Testnet });

function Punch() {
  const [isPunched, setIsPunched] = useState(false)

  const handlePunch = () => {
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
    sdk.client.getContractOwner().then((goals) => {
      console.log(goals)
    })
  }, [isHydrated])

  const createGoal = () => {
    sdk.contract.createGoal('Simple React Test', 'test for simple react', 100, 7)
  }

  return (
    <div>
      <div>
        <button onClick={createGoal}>Create Goal</button>
      </div>
      <div>
        <Punch />
        <Punch />
        <Punch />
        <Punch />
        <Punch />
        <Punch />
        <Punch />
      </div>
    </div>
  )
}


export default App
