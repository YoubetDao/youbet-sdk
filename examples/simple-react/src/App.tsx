import "./App.css";

import { ContractOwner } from "./components/sections/ContractOwner";
import { AllGoals } from "./components/sections/AllGoals";
import { GoalDetails } from "./components/sections/GoalDetails";
import { UserGoals } from "./components/sections/UserGoals";

import { CreateGoal } from "./components/sections/CreateGoal";
import { CreateGoalSolo } from "./components/sections/CreateGoalSolo";
import { ClaimStake } from "./components/sections/ClaimStake";
import { StakeAndUnlockGoal } from "./components/sections/StakeAndUnlockGoal";
import { ConfirmTaskCompletion } from "./components/sections/ConfirmTaskCompletion";
import { SettleGoal } from "./components/sections/SettleGoal";
import { CreateTask } from "./components/sections/CreateTask";
import { LinkWallet } from "./components/sections/LinkWallet";
import { AllTasks } from "./components/sections/AllTasks";
import { ConfirmTask } from "./components/sections/ConfirmTask";
import { AllUnconfirmedTasks } from "./components/sections/AllUnconfirmedTasks";
import { UserPoints } from "./components/sections/UserPoints";
import { DonateToProject } from "./components/sections/DonateToProject";
import { ClaimReward } from "./components/sections/ClaimReward";
import { GetClaimedRewards } from "./components/sections/GetClaimedRewards";
import { GetTotalRewards } from "./components/sections/GetTotalRewards";
import { AllProjects } from "./components/sections/AllProjects";
import { GetProjectParticipants } from "./components/sections/GetProjectParticipants";
import { GetWalletByGithub } from "./components/sections/GetWalletByGithub";
import { GetGithubByWallet } from "./components/sections/GetGithubByWallet";
// import { GoalCreated } from './components/sections/GoalCreated'

function App() {
  return (
    <>
      <header className="header">
        <img
          className="logo"
          src="/logo.png"
          alt="logo"
          width={28}
          height={28}
        />
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

        <AllTasks />
        <AllUnconfirmedTasks />
        <UserPoints />

        <CreateTask />
        <ConfirmTask />
        <LinkWallet />
        <DonateToProject />
        <ClaimReward />
        <GetTotalRewards />
        <GetClaimedRewards />
        <AllProjects />
        <GetProjectParticipants />
        <GetWalletByGithub />
        <GetGithubByWallet />
        {/* <GoalCreated /> */}
      </main>
      <footer className="footer">
        Powered By{" "}
        <a
          href="https://youbetdao.github.io/"
          target="_blank"
          rel="noreferrer noopener"
        >
          YouBet
        </a>
      </footer>
    </>
  );
}

export default App;
