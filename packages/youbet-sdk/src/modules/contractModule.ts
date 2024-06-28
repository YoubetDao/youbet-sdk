import { ethers } from 'ethers';
import { SDK } from '../sdk';

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
      await provider.send('wallet_switchEthereumChain', [{ chainId: ethers.toBeHex(this.sdk.sdkOptions.networkOptions.chainId) }])
      const signer = await provider.getSigner()
      this._ethContract = new ethers.Contract(this.sdk.sdkOptions.networkOptions.contractAddress, this.sdk.sdkOptions.networkOptions.abi, signer);
      return this._ethContract;
    } else {
      throw new Error("Provider configuration is missing");
    }
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
}