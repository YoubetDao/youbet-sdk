
import ABI from './lib/abi/bet.json';
import { ClientModule } from './modules/clientModule';
import { ContractModule } from './modules/contractModule';
// import { EventModule } from './modules/eventModule';

export enum NetworkType {
  Mainnet,
  Testnet,
}

export type SdkCtorOptions = {
  privateKey?: string;
  networkType?: NetworkType;
}

export type SdkOptions = {
  privateKey?: string;
  networkOptions: NetworkOptions;
}

export type NetworkOptions = {
  contractAddress: string;
  rpcUrl: string;
  chainId: number;
  abi: any;
}

export class SDK {
  private _sdkOptions: SdkOptions;
  private _client: ClientModule;
  private _contract: ContractModule;
  // private _event: EventModule;

  constructor(options?: SdkCtorOptions) {
    const { networkType } = { ...options };

    const mainnetOptions = {
      contractAddress: '0x902e2f3179aa959137fdc823754555b10c40f5b1',
      rpcUrl: 'https://rpc.linea.build',
      chainId: 59144,
      abi: ABI
    }

    const testnetOptions = {
      contractAddress: '0xD5C57B49b58744202EB1e67F4b7e6cB1aD06844f',
      rpcUrl: 'https://open-campus-codex-sepolia.drpc.org',
      chainId: 656476,
      abi: ABI
    }

    let networkOptions = mainnetOptions

    if (networkType === NetworkType.Testnet) {
      networkOptions = testnetOptions
    }

    this._sdkOptions = {
      privateKey: options?.privateKey,
      networkOptions
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