import bs58 from "bs58";
import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { SolanaContractModule } from "../src/modules/solanaContractModule";
import { SdkCtorOptions } from "../src/types/index";
import { SDK } from "../src/sdk";
import { Wallet } from "@coral-xyz/anchor";

require("dotenv").config();
const SECONDS = 1000;
jest.setTimeout(70 * SECONDS);
const privateKey = "";
const authority = Keypair.fromSecretKey(bs58.decode(privateKey));
const project_id = "project_repo#844974703";
const task_id = "task_repo#844974703";
const github_id = "844974701";

describe("backend", () => {
  const sdkCtorOptions: SdkCtorOptions = {
    privateKey: privateKey,
    chainName: "solana",
    networkOptions: {
      contractAddress: "",
      rpcUrl: "https://api.devnet.solana.com",
      chainId: 0,
    },
    wallet: new Wallet(Keypair.fromSecretKey(bs58.decode(privateKey))),
    connection: new Connection("https://api.devnet.solana.com", {
      commitment: "confirmed",
    }),
  };
  let sdk = new SDK(sdkCtorOptions);
  let solanaContractModdule = new SolanaContractModule(sdk);

  test("setAdmin", async () => {
    await solanaContractModdule.setAdminConfigAccount(authority, authority);
    let adminConfigData = await solanaContractModdule.getAdminConfigAccount();
    console.log(adminConfigData);
  });
  test("changeAdmin", async () => {
    await solanaContractModdule.changeAdminConfigAccount(
      authority,
      new PublicKey("Fcc9gAaqX5esiwziPLtG4J47graU8py8dKn8hRx14fme")
    );
    let adminConfigData = await solanaContractModdule.getAdminConfigAccount();
    console.log(adminConfigData);
  });
  test("setProject", async () => {
    await solanaContractModdule.createProject(project_id, project_id);
    let project = await solanaContractModdule.getProject(project_id);
    console.log(project);
  });
  test("setTask", async () => {
    await solanaContractModdule.createTask(task_id, task_id, project_id);
    let taskData = await solanaContractModdule.getTask(task_id);
    console.log(taskData);
  });
  test("linkWallet", async () => {
    await solanaContractModdule.linkWallet(
      authority.publicKey.toBase58(),
      github_id
    );
    let g = await solanaContractModdule.getGithubByWallet(
      authority.publicKey.toBase58()
    );
    console.log(g);
    let w = await solanaContractModdule.getWalletByGithub(github_id);
    console.log(w);
  });
  test("confirmTask", async () => {
    await solanaContractModdule.confirmTask(task_id, github_id);
    const userPoint = await solanaContractModdule.getUserPoints(
      authority.publicKey.toBase58()
    );
    console.log(userPoint);
    const tasks = await solanaContractModdule.getUserCompletedTasks(
      authority.publicKey.toBase58()
    );
    console.log(tasks);
  });
});

describe("client", () => {
  const connection = new Connection("https://api.devnet.solana.com", {
    commitment: "confirmed",
  });
  const wallet = new Wallet(authority);

  let sdkCtorOptions: SdkCtorOptions = {
    privateKey: "",
    networkOptions: {
      contractAddress: "string",
      rpcUrl: "https://api.devnet.solana.com",
      chainId: 0,
    },
    wallet,
    connection,
  };
  let sdk = new SDK(sdkCtorOptions);
  let solanaContractModdule = new SolanaContractModule(sdk);

  test("donateToProject", async () => {
    await solanaContractModdule.donateToProject(project_id, "0.01");
    let rewardAmount = await solanaContractModdule.getRewardAmount(
      wallet.publicKey.toBase58()
    );
    console.log(rewardAmount);
  });
  test("claimReward", async () => {
    let rewardAmount = await solanaContractModdule.getRewardAmount(
      wallet.publicKey.toBase58()
    );
    console.log(rewardAmount);
    await solanaContractModdule.claimReward();
    let rewardAmount1 = await solanaContractModdule.getRewardAmount(
      wallet.publicKey.toBase58()
    );
    console.log(rewardAmount1);
  });
});
