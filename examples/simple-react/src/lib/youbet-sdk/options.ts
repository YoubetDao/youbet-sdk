import { SdkCtorOptions } from "youbet-sdk";

export const lineaOptions: SdkCtorOptions = {
  networkOptions: {
    contractAddress: '0x902e2f3179aa959137fdc823754555b10c40f5b1',
    rpcUrl: 'https://rpc.linea.build',
    chainId: 59144,
  },
  chainName: 'Linea',
}

export const openCampusTestOptions: SdkCtorOptions = {
  networkOptions: {
    rpcUrl: 'https://open-campus-codex-sepolia.drpc.org',
    chainId: 656476,
    contractAddress: '0xD5C57B49b58744202EB1e67F4b7e6cB1aD06844f',
  },
  chainName: 'OpenCampus-Testnet',
};