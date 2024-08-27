import { ethers, ContractTransactionResponse } from 'ethers';
import { SDK } from '../sdk';
import { formatResult } from "../lib/utils";
import { GoalInfo } from '../types';

export class ContractModule {
  protected _sdk: SDK;
  private _ethContract: ethers.Contract | null = null;

  constructor(sdk: SDK) {
    this._sdk = sdk;
  }

  get sdk(): SDK {
    return this._sdk;
  }
  
  async _getContract(): Promise<ethers.Contract>{
    if (this._ethContract) return this._ethContract;
    // 私钥
    if (this.sdk.sdkOptions.privateKey) {
      const provider = new ethers.JsonRpcProvider(this.sdk.sdkOptions.networkOptions.rpcUrl);
      const wallet = new ethers.Wallet(this.sdk.sdkOptions.privateKey, provider);
      this._ethContract = new ethers.Contract(this.sdk.sdkOptions.networkOptions.contractAddress, this.sdk.sdkOptions.networkOptions.abi, wallet);
      return this._ethContract;
    } 
    // 钱包插件
    else if (typeof window !== 'undefined' && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      // TODO: the scroll chainId seems not working?
      // await provider.send('wallet_switchEthereumChain', [{ chainId: ethers.toBeHex(this.sdk.sdkOptions.networkOptions.chainId) }])
      const hexChainId = '0x' + Number(this.sdk.sdkOptions.networkOptions.chainId).toString(16);
      await provider.send('wallet_addEthereumChain', [{
        chainId: hexChainId,
        chainName: this.sdk.sdkOptions.chainName || 'Unknown Chain',
        rpcUrls: [this.sdk.sdkOptions.networkOptions.rpcUrl],
      }]);
      const signer = await provider.getSigner()
      this._ethContract = new ethers.Contract(this.sdk.sdkOptions.networkOptions.contractAddress, this.sdk.sdkOptions.networkOptions.abi, signer);
      return this._ethContract;
    } else {
      throw new Error("Provider configuration is missing");
    }
  }

  async createGoal(name: string, description: string, requiredStake: number, taskCount: number): Promise<GoalInfo | undefined> {
    const contract = await this._getContract();
    const tx: ContractTransactionResponse = await contract.createGoal(name, description, requiredStake, taskCount);
    const receipt = await tx.wait();
    if (!receipt) return
    const eventGoalCreated = receipt.logs.find((log) => 'eventName' in log && log.eventName === 'GoalCreated')
    if (!eventGoalCreated || !('args' in eventGoalCreated)) return
    const result = formatResult<GoalInfo>(eventGoalCreated.args)
    return result
  }

  async createGoalSolo(name: string, description: string, requiredStake: number, taskCount: number): Promise<GoalInfo | undefined> {
    const contract = await this._getContract();
    const tx: ContractTransactionResponse = await contract.createGoalSolo(name, description, requiredStake, taskCount);
    await tx.wait();
    const receipt = await tx.wait();
    if (!receipt) return
    const eventGoalCreated = receipt.logs.find((log) => 'eventName' in log && log.eventName === 'GoalCreated')
    if (!eventGoalCreated || !('args' in eventGoalCreated)) return
    const result = formatResult<GoalInfo>(eventGoalCreated.args)
    return result
  }

  async claimStake(goalId: number): Promise<void> {
    const contract = await this._getContract();
    const tx = await contract.claimStake(goalId);
    await tx.wait();
  }

  async stakeAndUnlockGoal(goalId: number): Promise<void> {
    const contract = await this._getContract();
    const goalDetails = await this.sdk.client.getGoalDetails(goalId);
    const value = goalDetails.requiredStake;
    const tx = await contract.stakeAndUnlockGoal(goalId, { value });
    await tx.wait();
  }

  async confirmTaskCompletion(goalId: number, user: string): Promise<void> {
    const contract = await this._getContract();
    const tx = await contract.confirmTaskCompletion(goalId, user);
    await tx.wait();
  }

  async settleGoal(goalId: number): Promise<void> {
    const contract = await this._getContract();
    const tx = await contract.settleGoal(goalId);
    await tx.wait();
  }

  async createTask(id: string, name: string, projectId: string): Promise<void> {
    const contract = await this._getContract();
    const tx = await contract.createTask(id, name, projectId);
    await tx.wait();
  }

  async createProject(id: string, name: string): Promise<void> {
    const contract = await this._getContract();
    const tx = await contract.createProject(id, name);
    await tx.wait();
  }
  
  async linkWallet(user: string, github: string): Promise<void> {
    const contract = await this._getContract();
    const tx = await contract.linkWallet(user, github);
    await tx.wait();
  }
  
  async confirmTask(taskId: string, github: string): Promise<void> {
    const contract = await this._getContract();
    const tx = await contract.confirmTask(taskId, github);
    await tx.wait();
  }

  async claimReward(): Promise<void> {
    const contract = await this._getContract();
    const tx = await contract.claimReward();
    await tx.wait();
  }

  async donateToProject(projectId: string, amount: string): Promise<void> {
    const contract = await this._getContract();
    const tx = await contract.donateToProject(projectId, {value: ethers.parseEther(amount)});
    await tx.wait();
  }
}