import { ethers, BaseContractMethod, BaseContract, Result } from "ethers";
import { SDK } from "../sdk";
import { formatResult } from "../lib/utils";
import { GoalInfo, Task } from "../types";

export interface ViewContract extends BaseContract {
  contractOwner: BaseContractMethod<[], any, string>;
  getAllGoals: BaseContractMethod<[], any, Result>;
  getGoalDetails: BaseContractMethod<[number], any, Result>;
  getUserGoals: BaseContractMethod<[string], any, Result>;
  getAllTasks: BaseContractMethod<[], any, Result>;
  getUnconfirmedTasks: BaseContractMethod<[], any, Result>;
  getUserPoints: BaseContractMethod<[string], any, number>;
  getUserCompletedTasks: BaseContractMethod<[string], any, Result>;
}

export class ClientModule {
  protected _sdk: SDK;
  private _ethContract: ViewContract | null = null;

  constructor(sdk: SDK) {
    this._sdk = sdk;
  }

  async _getContract(): Promise<ViewContract>{
    if (this._ethContract) {
      return this._ethContract;
    }
    const provider = new ethers.JsonRpcProvider(this._sdk.sdkOptions.networkOptions.rpcUrl);
    this._ethContract = new ethers.Contract(this._sdk.sdkOptions.networkOptions.contractAddress, this._sdk.sdkOptions.networkOptions.abi, provider) as unknown as ViewContract;
    return this._ethContract;
  }

  async getContractOwner(): Promise<string> {
    const contract = await this._getContract();
    return await contract.contractOwner();
  }

  async getAllGoals(): Promise<GoalInfo[]> {
    const contract = await this._getContract();
    const result = await contract.getAllGoals();
    const allGoals = formatResult<GoalInfo[]>(result)
    return allGoals
  }

  async getGoalDetails(goalId: number): Promise<GoalInfo> {
    const contract = await this._getContract();
    const result = await contract.getGoalDetails(goalId);
    const goal = formatResult<GoalInfo>(result)
    return goal
  }

  async getUserGoals(user: string): Promise<number[]> {
    const contract = await this._getContract();
    const result = await contract.getUserGoals(user);
    const goals = formatResult<number[]>(result, true)
    return goals
  }

  async getAllTasks(): Promise<GoalInfo[]> {
    const contract = await this._getContract();
    const result = await contract.getAllTasks();
    const allGoals = formatResult<GoalInfo[]>(result)
    return allGoals
  }

  async getUnconfirmedTasks(): Promise<Task[]> {
    const contract = await this._getContract();
    const unconfirmedTasks: Task[] = await contract.getUnconfirmedTasks();
    return unconfirmedTasks;
  }
  
  async getUserPoints(userAddress: string): Promise<number> {
    const contract = await this._getContract();
    const points: number = await contract.getUserPoints(userAddress);
    return points;
  }
  
  async getUserCompletedTasks(userAddress: string): Promise<number[]> {
    const contract = await this._getContract();
    const completedTasks: number[] = await contract.getUserCompletedTasks(userAddress);
    return completedTasks;
  }
}
