import { SdkCtorOptions } from "youbet-sdk";

export const lineaTestOptions: SdkCtorOptions = {
  networkOptions: {
    contractAddress: "0x537AEB55b80a2361414318BF3BF8c2b340c212E7",
    rpcUrl: "https://rpc.sepolia.linea.build",
    chainId: 59144,
  },
  chainName: "Linea",
};

export const openCampusTestOptions: SdkCtorOptions = {
  networkOptions: {
    rpcUrl: "https://open-campus-codex-sepolia.drpc.org",
    chainId: 656476,
    contractAddress: "0xd8dcbd828a40f6590a5bee5095c38994dab3bdee",
  },
  chainName: "OpenCampus-Testnet",
};

export const neoTestOptions: SdkCtorOptions = {
  networkOptions: {
    rpcUrl: "https://neoxt4seed1.ngd.network",
    chainId: 12227332,
    contractAddress: "0x31794487C8AEFEec3daDad01b33e9Cc70Fe02aEe",
  },
  chainName: "NeoX T4",
};
