import { GoalInfo, Task } from "../types";

export interface BaseClientModule {
  getContractOwner(): Promise<string>;
  getAllGoals(): Promise<GoalInfo[]>;
  getGoalDetails(goalId: number): Promise<GoalInfo>;
  getUserGoals(user: string): Promise<number[]>;
  getAllTasks(): Promise<GoalInfo[]>;
  getUnconfirmedTasks(): Promise<Task[]>;
  getUserPoints(userAddress: string): Promise<number>;
  getUserCompletedTasks(userAddress: string): Promise<number[]>;
  getTotalRewards(address: string): Promise<any>;
  getClaimedRewards(address: string): Promise<any>;
  getAllProjectIds(): Promise<string[]>;
  getProjectParticipants(projectId: string): Promise<string[]>;
  getProjectUserPoints(projectId: string, user: string): Promise<number>;
  getGithubByWallet(user: string): Promise<string>;
  getWalletByGithub(github: string): Promise<string>;
}
