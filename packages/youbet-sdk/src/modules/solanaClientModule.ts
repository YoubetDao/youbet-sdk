import { AnchorProvider, Idl, Program, Wallet } from "@coral-xyz/anchor";
import bs58 from "bs58";

import type { YoubetSolanaProgram } from "../lib/idl/youbet_solana_program";
import idl from "../lib/idl/youbet_solana_program.json";
import { SDK } from "../sdk";

import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import { BaseClientModule } from "./baseClientModule";
import { GoalInfo, Task } from "../types";

const ADMIN_CONFIG_PREFIX: string = "ADMIN_CONFIG";
const PROJECT_PREFIX: string = "PROJECT";
const TASK_PREFIX: string = "TASK";
const PROJECT_USER_POINT_PREFIX: string = "PROJECT_USER_POINT";
const WALLET_PREFIX: string = "WALLET";
const GITHUB_PREFIX: string = "GITHUB";
const DONATE_POOL_PREFIX: string = "DONATE_POOL";
const REWARD_PREFIX: string = "REWARD";

export class SolanaClientModule implements BaseClientModule {
  youbetSolanaProgram: Program<YoubetSolanaProgram>;
  feeAndRentKeypair!: Keypair;
  wallet!: Wallet;
  connection: Connection;

  constructor(sdk: SDK) {
    if (sdk.sdkOptions.privateKey) {
      this.feeAndRentKeypair = Keypair.fromSecretKey(
        bs58.decode(sdk.sdkOptions.privateKey)
      );
      this.wallet = new Wallet(this.feeAndRentKeypair);
      this.connection = new Connection(sdk.sdkOptions.networkOptions.rpcUrl, {
        commitment: "confirmed",
      });
    } else {
      this.wallet = sdk.sdkOptions.wallet!;
      this.connection = sdk.sdkOptions.connection!;
    }
    const provider = new AnchorProvider(
      this.connection,
      this.wallet,
      AnchorProvider.defaultOptions()
    );
    this.youbetSolanaProgram = new Program(
      idl as Idl,
      provider
    ) as unknown as Program<YoubetSolanaProgram>;
  }

  getContractOwner(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getAllGoals(): Promise<GoalInfo[]> {
    throw new Error("Method not implemented.");
  }
  getGoalDetails(goalId: number): Promise<GoalInfo> {
    throw new Error("Method not implemented.");
  }
  getUserGoals(user: string): Promise<number[]> {
    throw new Error("Method not implemented.");
  }
  getAllTasks(): Promise<GoalInfo[]> {
    throw new Error("Method not implemented.");
  }
  getUnconfirmedTasks(): Promise<Task[]> {
    throw new Error("Method not implemented.");
  }

  getAllProjectIds(): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  getProjectParticipants(projectId: string): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  getProjectUserPoints(projectId: string, user: string): Promise<number> {
    throw new Error("Method not implemented.");
  }

  getAdminConfigAccountPdaAndBump(): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(ADMIN_CONFIG_PREFIX)],
      this.youbetSolanaProgram.programId
    );
  }
  getProjectAccountPdaAndBump(project_id: string): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(PROJECT_PREFIX), Buffer.from(project_id)],
      this.youbetSolanaProgram.programId
    );
  }
  getTaskAccountPdaAndBump(task_id: string): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(TASK_PREFIX), Buffer.from(task_id)],
      this.youbetSolanaProgram.programId
    );
  }
  getWalletAccountPdaAndBump(wallet: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(WALLET_PREFIX), wallet.toBuffer()],
      this.youbetSolanaProgram.programId
    );
  }
  getGithubAccountPdaAndBump(github: string): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(GITHUB_PREFIX), Buffer.from(github)],
      this.youbetSolanaProgram.programId
    );
  }
  getProjectUserPointPdaAndBump(
    project_id: string,
    wallet: PublicKey
  ): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from(PROJECT_USER_POINT_PREFIX),
        Buffer.from(project_id),
        wallet.toBuffer(),
      ],
      this.youbetSolanaProgram.programId
    );
  }
  getDonatePoolPdaAndBump(): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(DONATE_POOL_PREFIX)],
      this.youbetSolanaProgram.programId
    );
  }
  getRewardPdaAndBump(wallet: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(REWARD_PREFIX), wallet.toBuffer()],
      this.youbetSolanaProgram.programId
    );
  }

  async getAdminConfigAccount(): Promise<any> {
    const [adminConfig, _adminBump] = this.getAdminConfigAccountPdaAndBump();
    const adminConfigData =
      await this.youbetSolanaProgram.account.adminConfigAccount.fetch(
        adminConfig.toBase58()
      );
    return adminConfigData;
  }

  async getTask(id: string): Promise<any> {
    const [task, _taskBump] = this.getTaskAccountPdaAndBump(id);
    const taskData = await this.youbetSolanaProgram.account.taskAccount.fetch(
      task.toBase58()
    );
    return taskData;
  }

  async getProject(id: string): Promise<any> {
    const [project, _projectBump] = this.getProjectAccountPdaAndBump(id);
    const projectData =
      await this.youbetSolanaProgram.account.projectAccount.fetch(
        project.toBase58()
      );
    return projectData;
  }
  async isProjectExisted(id: string): Promise<boolean> {
    const [project, _projectBump] = this.getProjectAccountPdaAndBump(id);
    const projectData =
      await this.youbetSolanaProgram.account.projectAccount.fetch(
        project.toBase58()
      );
    if (projectData) {
      return true;
    } else {
      return false;
    }
  }
  async linkWallet(user: string, github: string): Promise<void> {
    const wallet = new PublicKey(user);
    const [adminConfig, adminBump] = this.getAdminConfigAccountPdaAndBump();
    const [walletAccount, _walletBump] =
      this.getWalletAccountPdaAndBump(wallet);
    const [githubAccount, _githubBump] =
      this.getGithubAccountPdaAndBump(github);

    let createLinkWalletAccounts = {
      feeAndRentPayer: this.feeAndRentKeypair.publicKey,
      adminConfig: adminConfig,
      walletAccount,
      githubAccount,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    };
    const tx = await this.youbetSolanaProgram.methods
      .linkWallet(wallet, github, adminBump)
      .accounts(createLinkWalletAccounts)
      .signers([this.feeAndRentKeypair])
      .rpc();
    console.log("linkWallet signature", tx);
  }
  async getGithubByWallet(wallet: string): Promise<any> {
    const walletPk = new PublicKey(wallet);
    const [walletAccount, _walletBump] =
      this.getWalletAccountPdaAndBump(walletPk);
    const walletData =
      await this.youbetSolanaProgram.account.walletAccount.fetch(
        walletAccount.toBase58()
      );
    return walletData.github;
  }
  async getWalletByGithub(github: string): Promise<any> {
    const [githubAccount, _githubBump] =
      this.getGithubAccountPdaAndBump(github);
    const githubData =
      await this.youbetSolanaProgram.account.githubAccount.fetch(
        githubAccount.toBase58()
      );
    return githubData.wallet;
  }

  async getUserPoints(user: string): Promise<any> {
    const walletPk = new PublicKey(user);
    const [walletAccount, _walletBump] =
      this.getWalletAccountPdaAndBump(walletPk);
    const walletData =
      await this.youbetSolanaProgram.account.walletAccount.fetch(
        walletAccount.toBase58()
      );
    return walletData.userPoint;
  }
  async getUserCompletedTasks(user: string): Promise<Array<any>> {
    const walletPk = new PublicKey(user);
    const [walletAccount, _walletBump] =
      this.getWalletAccountPdaAndBump(walletPk);
    const walletData =
      await this.youbetSolanaProgram.account.walletAccount.fetch(
        walletAccount.toBase58()
      );
    return walletData.completedTasks;
  }
  // TODO
  async getClaimedRewards(address: string): Promise<number> {
    const wallet = new PublicKey(address);
    const [rewardPda, _rewardBump] = this.getRewardPdaAndBump(wallet);
    const rewardAccount =
      await this.youbetSolanaProgram.account.rewardAccount.fetch(rewardPda);
    return rewardAccount.accumulatedAmount - rewardAccount.rewardAmount;
  }
  async getTotalRewards(address: string): Promise<any> {
    const wallet = new PublicKey(address);
    const [rewardPda, _rewardBump] = this.getRewardPdaAndBump(wallet);
    const rewardAccount =
      await this.youbetSolanaProgram.account.rewardAccount.fetch(rewardPda);
    return rewardAccount.accumulatedAmount;
  }
}
