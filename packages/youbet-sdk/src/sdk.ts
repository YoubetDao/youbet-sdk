import { ethers } from 'ethers';
import { Contract } from './contract';
import { GoalInfo } from './types';
import ABI from './lib/abi/bet.json';

const DefaultOptions = {
  contractAddress: '0x902e2f3179aa959137fdc823754555b10c40f5b1',
  abi: ABI,
  providerUrl: 'https://rpc.linea.build'
}

export class SDK {
  private contract: Contract;

  constructor(options: { contractAddress?: string, abi?: any, providerUrl?: string } = {}) {
    const { contractAddress, abi, providerUrl } = { ...DefaultOptions, ...options };
    const provider = new ethers.JsonRpcProvider(providerUrl);
    this.contract = new Contract(contractAddress, abi, provider);
  }

  async claimStake(goalId: number): Promise<void> {
    return await this.contract.claimStake(goalId);
  }

  async confirmTaskCompletion(goalId: number, user: string): Promise<void> {
    return await this.contract.confirmTaskCompletion(goalId, user);
  }

  async getContractOwner(): Promise<string> {
    return await this.contract.getContractOwner();
  }

  async createGoal(name: string, description: string, requiredStake: number, taskCount: number): Promise<void> {
    return await this.contract.createGoal(name, description, requiredStake, taskCount);
  }

  async createGoalSolo(name: string, description: string, requiredStake: number, taskCount: number): Promise<void> {
    return await this.contract.createGoalSolo(name, description, requiredStake, taskCount);
  }

  async getAllGoals(): Promise<GoalInfo[]> {
    return await this.contract.getAllGoals();
  }

  async getGoalDetails(goalId: number): Promise<GoalInfo> {
    return await this.contract.getGoalDetails(goalId);
  }

  async getUserGoals(user: string): Promise<number[]> {
    return await this.contract.getUserGoals(user);
  }

  async settleGoal(goalId: number): Promise<void> {
    return await this.contract.settleGoal(goalId);
  }

  async stakeAndUnlockGoal(goalId: number, value: string): Promise<void> {
    return await this.contract.stakeAndUnlockGoal(goalId, value);
  }
}