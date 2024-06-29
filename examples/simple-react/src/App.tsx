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
// import { GoalCreated } from './components/sections/GoalCreated'

function App() {
  return (
    <>
      <header className="header">
        <img className="logo" src="/logo.png" alt="logo" width={28} height={28} />
        <span>YouBet SDK</span>
      </header>
      <main className="main">
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

        {/* <GoalCreated /> */}
      </main>
      <footer className="footer">
        Powered By <a href="https://youbetdao.github.io/" target="_blank" rel="noreferrer noopener">YouBet</a>
      </footer>
    </>
  )
}

export default App
