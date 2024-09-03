
import ABI from './lib/abi/bet.json';
import { ClientModule } from './modules/clientModule';
import { ContractModule } from './modules/contractModule';
// import { EventModule } from './modules/eventModule';
import { SdkCtorOptions, SdkOptions } from './types';

export class SDK {
  private _sdkOptions: SdkOptions;
  private _client: ClientModule;
  private _contract: ContractModule;
  // private _event: EventModule;

  constructor(options?: SdkCtorOptions) {
    const { networkOptions } = { ...options };

    if (!networkOptions) {
      throw new Error('Network options are required');
    }

    this._sdkOptions = {
      privateKey: options?.privateKey,
      networkOptions: {
        ...networkOptions,
        abi: ABI
      }
    }

    this._client = new ClientModule(this);
    this._contract = new ContractModule(this);
    // this._event = new EventModule(this);
  }

  get sdkOptions() {
    return this._sdkOptions
  }

  get client() {
    return this._client
  }

  get contract() {
    return this._contract
  }

  // get event() {
  //   return this._event
  // }
}