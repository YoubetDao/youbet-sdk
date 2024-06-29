import { SDK } from '../sdk';
import { ethers } from 'ethers';

export class CommonModule {
  protected _sdk: SDK;
  private _ethContract: ethers.Contract | null = null;

  constructor(sdk: SDK) {
    this._sdk = sdk;
  }

  get sdk(): SDK {
    return this._sdk;
  }
  
  async _getContract(): Promise<ethers.Contract> {
    if (this._ethContract) {
      return this._ethContract;
    }
    const provider = new ethers.JsonRpcProvider(this._sdk.sdkOptions.networkOptions.rpcUrl);
    this._ethContract = new ethers.Contract(this._sdk.sdkOptions.networkOptions.contractAddress, this._sdk.sdkOptions.networkOptions.abi, provider) as unknown as ethers.Contract;
    return this._ethContract;
  }
}