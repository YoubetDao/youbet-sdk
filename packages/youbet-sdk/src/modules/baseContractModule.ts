import { GoalInfo } from "../types";

export interface baseContractModule {
  createGoal(
    name: string,
    description: string,
    requiredStake: number,
    taskCount: number
  ): Promise<GoalInfo | undefined>;
  createGoalSolo(
    name: string,
    description: string,
    requiredStake: number,
    taskCount: number
  ): Promise<GoalInfo | undefined>;
  claimStake(goalId: number): Promise<void>;
  stakeAndUnlockGoal(goalId: number): Promise<void>;
  confirmTaskCompletion(goalId: number, user: string): Promise<void>;
  settleGoal(goalId: number): Promise<void>;
  createTask(id: string, name: string, projectId: string): Promise<void>;
  createProject(id: string, name: string): Promise<void>;
  linkWallet(user: string, github: string): Promise<void>;
  confirmTask(
    taskId: string,
    github: string,
    taskPoints: number
  ): Promise<void>;
  claimReward(): Promise<void>;
  donateToProject(projectId: string, amount: string): Promise<void>;
}
