import { ethers } from "ethers";
import { SDK } from "../sdk";

export interface GoalInfo {
  id: number;
  name: string;
  description: string;
  requiredStake: number;
  creator: string;
  completed: boolean;
  participants: string[];
  goalType: number;
}

export class ClientModule {
  protected _sdk: SDK;
  private _ethContract: ethers.Contract | null = null;

  constructor(sdk: SDK) {
    this._sdk = sdk;
  }

  async _getContract(): Promise<ethers.Contract>{
    if (this._ethContract) {
      return this._ethContract;
    }
    const provider = new ethers.JsonRpcProvider(this._sdk.sdkOptions.networkOptions.rpcUrl);
    this._ethContract = new ethers.Contract(this._sdk.sdkOptions.networkOptions.contractAddress, this._sdk.sdkOptions.networkOptions.abi, provider);
    return this._ethContract;
  }

  async getContractOwner(): Promise<string> {
    const contract = await this._getContract();
    return await contract.contractOwner();
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
}