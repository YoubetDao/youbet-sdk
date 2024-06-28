import './App.css'

import { ContractOwner } from './components/sections/ContractOwner'
import { AllGoals } from './components/sections/AllGoals'
import { GoalDetails } from './components/sections/GoalDetails'
import { UserGoals } from './components/sections/UserGoals'

import { CreateGoal } from './components/sections/CreateGoal'
import { CreateGoalSolo } from './components/sections/CreateGoalSolo'
import { ClaimStake } from './components/sections/ClaimStake'
import { StakeAndUnlockGoal } from './components/sections/StakeAndUnlockGoal'
import { ConfirmTaskCompletion } from './components/sections/ConfirmTaskCompletion'
import { SettleGoal } from './components/sections/SettleGoal'

function App() {
  return (
    <div className='main'>
      <ContractOwner />
      <AllGoals />
      <GoalDetails />
      <UserGoals />

      <CreateGoal />
      <CreateGoalSolo />
      <ClaimStake />
      <StakeAndUnlockGoal />
      <ConfirmTaskCompletion />
      <SettleGoal />
    </div>
  )
}


export default App
