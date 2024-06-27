import { useEffect, useState } from 'react'
import './App.css'

import { SDK, NetworkType } from 'youbet-sdk'
import { GoalInfo } from 'youbet-sdk/dist/modules/clientModule';
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
  const [contractOwner, setContractOwner] = useState('')
  const [goalId, setGoalId] = useState(0)
  const [goalDetails, setGoalDetails] = useState<GoalInfo>()
  const [userAddress, setUserAddress] = useState('')
  const [userGoals, setUserGoals] = useState<number[]>([])
  const [allGoals, setAllGoals] = useState<GoalInfo[]>([])

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    sdk.client.getContractOwner().then((address) => {
      setContractOwner(address)
    })
  }, [isHydrated])

  const createGoal = async () => {
    await sdk.contract.createGoal('Simple React Test', 'test for simple react', 100, 7)
    console.log('create goal')
  }

  useEffect(() => {
    if (!isHydrated) return
    sdk.client.getAllGoals().then((goals) => {
      setAllGoals(goals)
    })
  }, [isHydrated])

  const getGoalDetails = async () => {
    setGoalDetails(undefined)
    const goalDetails = await sdk.client.getGoalDetails(goalId)
    setGoalDetails(goalDetails)
    console.log(goalDetails)
  }

  const getUserGoals = async () => {
    const address = userAddress.trim()
    if (address === "") return

    setUserGoals([])
    const userGoals = await sdk.client.getUserGoals(userAddress)
    setUserGoals(userGoals)
  }

  return (
    <div>
      <div>
        <h2>Contract Owner</h2> 
        {/* <button onClick={getGoalDetails}>Get Goal Details</button> */}
        <textarea disabled value={contractOwner}></textarea>
      </div>

      <div>
        <h2>All Goals</h2> 
        {/* <button onClick={getGoalDetails}>Get Goal Details</button> */}
        {allGoals.map((goal) => {
          return  <textarea disabled value={goal ? JSON.stringify(goal) : ''}></textarea>
        })}
      </div>

      <div>
        <h2>Creation</h2>
        <button onClick={createGoal}>Create Goal</button>
      </div>
      
      <div>
        <h2>Goal Details</h2> 
        <input value={goalId} onChange={(e) => setGoalId(Number(e.target.value))} />
        <button onClick={getGoalDetails}>Get Goal Details</button>
        <textarea disabled value={goalDetails ? JSON.stringify(goalDetails) : ''}></textarea>
      </div>

      <div>
        <h2>User Goals</h2> 
        <input value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
        <button onClick={getUserGoals}>Get User Details</button>
        <textarea disabled value={userGoals ? JSON.stringify(userGoals) : ''}></textarea>
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
