import { ethers } from 'ethers';
import { GoalInfo } from './types';

export class Contract {
  private _contractAddress: string;
  private _abi: any;
  private _provider: ethers.JsonRpcProvider;
  private _contract: ethers.Contract | null;

  constructor(contractAddress: string, abi: any, provider: ethers.JsonRpcProvider) {
    this._contractAddress = contractAddress;
    this._abi = abi;
    this._provider = provider;
    this._contract = null;
  }
  
  async _getContract(): Promise<ethers.Contract>{
    return this._contract || this._provider.getSigner().then((signer) => {
      this._contract = new ethers.Contract(this._contractAddress, this._abi, signer);
      return this._contract;
    })
  }
  
  async getContractOwner(): Promise<string> {
    const contract = await this._getContract();
    return await contract.contractOwner();
  }

  async claimStake(goalId: number): Promise<void> {
    const contract = await this._getContract();
    const tx = await contract.claimStake(goalId);
    await tx.wait();
  }

  async confirmTaskCompletion(goalId: number, user: string): Promise<void> {
    const contract = await this._getContract();
    const tx = await contract.confirmTaskCompletion(goalId, user);
    await tx.wait();
  }

  async _getContractOwner(): Promise<string> {
    const contract = await this._getContract();
    return await contract.contractOwner();
  }

  async createGoal(name: string, description: string, requiredStake: number, taskCount: number): Promise<void> {
    const contract = await this._getContract();
    const tx = await contract.createGoal(name, description, requiredStake, taskCount);
    await tx.wait();
  }

  async createGoalSolo(name: string, description: string, requiredStake: number, taskCount: number): Promise<void> {
    const contract = await this._getContract();
    const tx = await contract.createGoalSolo(name, description, requiredStake, taskCount);
    await tx.wait();
  }

  async getAllGoals(): Promise<GoalInfo[]> {
    const contract = await this._getContract();
    return await contract.getAllGoals();
  }

  async getGoalDetails(goalId: number): Promise<GoalInfo> {
    const contract = await this._getContract();
    return await contract.getGoalDetails(goalId);
  }

  async getUserGoals(user: string): Promise<number[]> {
    const contract = await this._getContract();
    return await contract.getUserGoals(user);
  }

  async settleGoal(goalId: number): Promise<void> {
    const contract = await this._getContract();
    const tx = await contract.settleGoal(goalId);
    await tx.wait();
  }

  async stakeAndUnlockGoal(goalId: number, value: string): Promise<void> {
    const contract = await this._getContract();
    const tx = await contract.stakeAndUnlockGoal(goalId, { value: ethers.parseEther(value) });
    await tx.wait();
  }
}