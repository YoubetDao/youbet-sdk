import { type Eip1193Provider } from "ethers";

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

export interface GoalInfo {
  id: number;
  name: string;
  description: string;
  requiredStake: number;
  creator: string;
  completed: boolean;
  participants?: string[];
  goalType: number;
}

export interface Task {
  id: number;
  sub: string;
  completed: boolean;
}

export type SdkCtorOptions = {
  privateKey?: string;
  networkOptions: Omit<NetworkOptions, 'abi'>;
  chainName?: string;
}

export type SdkOptions = {
  privateKey?: string;
  networkOptions: NetworkOptions;
  chainName?: string;
}

export type NetworkOptions = {
  contractAddress: string;
  rpcUrl: string;
  chainId: number;
  abi: any;
}