import { AnchorProvider, Idl, Program, BN } from "@coral-xyz/anchor";
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
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { baseContractModule } from "./baseContractModule";
import { GoalInfo } from "../types";

const ADMIN_CONFIG_PREFIX: string = "ADMIN_CONFIG";
const PROJECT_PREFIX: string = "PROJECT";
const TASK_PREFIX: string = "TASK";
const PROJECT_USER_POINT_PREFIX: string = "PROJECT_USER_POINT";
const WALLET_PREFIX: string = "WALLET";
const GITHUB_PREFIX: string = "GITHUB";
const DONATE_POOL_PREFIX: string = "DONATE_POOL";
const REWARD_PREFIX: string = "REWARD";

export function toBuffer(str: string) {
  return typeof Buffer !== "undefined"
    ? Buffer.from(str)
    : new Uint8Array([...str].map((c) => c.charCodeAt(0)));
}

type DonateToParams = {
  account: PublicKey;
  rewardPda: PublicKey;
  rewardBump: number;
  projectUserPointPda: PublicKey;
  projectUserPointBump: number;
};

export class SolanaContractModule implements baseContractModule {
  youbetSolanaProgram: Program<YoubetSolanaProgram>;
  feeAndRentKeypair!: Keypair;
  wallet!: any;
  connection: Connection;

  constructor(sdk: SDK) {
    if (sdk.sdkOptions.privateKey) {
      this.feeAndRentKeypair = Keypair.fromSecretKey(
        bs58.decode(sdk.sdkOptions.privateKey)
      );
    }
    this.wallet = sdk.sdkOptions.wallet!;
    this.connection = sdk.sdkOptions.connection!;

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
  createGoal(
    name: string,
    description: string,
    requiredStake: number,
    taskCount: number
  ): Promise<GoalInfo | undefined> {
    throw new Error("Method not implemented.");
  }
  createGoalSolo(
    name: string,
    description: string,
    requiredStake: number,
    taskCount: number
  ): Promise<GoalInfo | undefined> {
    throw new Error("Method not implemented.");
  }
  claimStake(goalId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  stakeAndUnlockGoal(goalId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  confirmTaskCompletion(goalId: number, user: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  settleGoal(goalId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getAdminConfigAccountPdaAndBump(): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [toBuffer(ADMIN_CONFIG_PREFIX)],
      this.youbetSolanaProgram.programId
    );
  }
  getProjectAccountPdaAndBump(project_id: string): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [toBuffer(PROJECT_PREFIX), toBuffer(project_id)],
      this.youbetSolanaProgram.programId
    );
  }
  getTaskAccountPdaAndBump(task_id: string): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [toBuffer(TASK_PREFIX), toBuffer(task_id)],
      this.youbetSolanaProgram.programId
    );
  }
  getWalletAccountPdaAndBump(wallet: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [toBuffer(WALLET_PREFIX), wallet.toBuffer()],
      this.youbetSolanaProgram.programId
    );
  }
  getGithubAccountPdaAndBump(github: string): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [toBuffer(GITHUB_PREFIX), toBuffer(github)],
      this.youbetSolanaProgram.programId
    );
  }
  getProjectUserPointPdaAndBump(
    project_id: string,
    wallet: PublicKey
  ): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [
        toBuffer(PROJECT_USER_POINT_PREFIX),
        toBuffer(project_id),
        wallet.toBuffer(),
      ],
      this.youbetSolanaProgram.programId
    );
  }
  getDonatePoolPdaAndBump(): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [toBuffer(DONATE_POOL_PREFIX)],
      this.youbetSolanaProgram.programId
    );
  }
  getRewardPdaAndBump(wallet: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [toBuffer(REWARD_PREFIX), wallet.toBuffer()],
      this.youbetSolanaProgram.programId
    );
  }

  async setAdminConfigAccount(
    feeAndRentPayer: Keypair,
    authority: Keypair
  ): Promise<void> {
    const [adminConfig, _adminBump] = this.getAdminConfigAccountPdaAndBump();
    const [donatePoolPda, _donatePoolBump] = this.getDonatePoolPdaAndBump();

    let initializeAccounts = {
      feeAndRentPayer: feeAndRentPayer.publicKey,
      authority: authority.publicKey,
      adminConfig,
      donatePoolPda,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    };
    const tx = await this.youbetSolanaProgram.methods
      .initialize()
      .accounts(initializeAccounts)
      .signers([feeAndRentPayer, authority])
      .rpc();
    console.log("setAdminConfigAccount signature", tx);
  }
  async getAdminConfigAccount(): Promise<any> {
    const [adminConfig, _adminBump] = this.getAdminConfigAccountPdaAndBump();
    const adminConfigData =
      await this.youbetSolanaProgram.account.adminConfigAccount.fetch(
        adminConfig.toBase58()
      );
    return adminConfigData;
  }
  async createTask(id: string, name: string, projectId: string): Promise<void> {
    const [task, _taskBump] = this.getTaskAccountPdaAndBump(id);
    const [project, projectBump] = this.getProjectAccountPdaAndBump(projectId);
    let createTaskAccounts = {
      feeAndRentPayer: this.feeAndRentKeypair.publicKey,
      task,
      project,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    };
    const tx = await this.youbetSolanaProgram.methods
      .createTask(id, name, projectId, projectBump)
      .accounts(createTaskAccounts)
      .signers([this.feeAndRentKeypair])
      .rpc();
    console.log("createTask signature", tx);
  }
  async getTask(id: string): Promise<any> {
    const [task, _taskBump] = this.getTaskAccountPdaAndBump(id);
    const taskData = await this.youbetSolanaProgram.account.taskAccount.fetch(
      task.toBase58()
    );
    return taskData;
  }
  async createProject(id: string, name: string): Promise<void> {
    const [project, _projectBump] = this.getProjectAccountPdaAndBump(id);
    let createProjectAccounts = {
      feeAndRentPayer: this.feeAndRentKeypair.publicKey,
      project,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    };
    const tx = await this.youbetSolanaProgram.methods
      .createProject(id, name)
      .accounts(createProjectAccounts)
      .signers([this.feeAndRentKeypair])
      .rpc();
    console.log("createProject signature", tx);
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
  async confirmTask(taskId: string, github: string): Promise<void> {
    const [task, taskBump] = this.getTaskAccountPdaAndBump(taskId);
    const taskData = await this.youbetSolanaProgram.account.taskAccount.fetch(
      task.toBase58()
    );
    const [githubAccount, githubBump] = this.getGithubAccountPdaAndBump(github);
    const githubData =
      await this.youbetSolanaProgram.account.githubAccount.fetch(
        githubAccount.toBase58()
      );
    const wallet = new PublicKey(githubData.wallet);
    const [walletAccount, walletBump] = this.getWalletAccountPdaAndBump(wallet);
    const [project, _projectBump] = this.getProjectAccountPdaAndBump(
      taskData.projectId
    );
    const [projectUserPoint, _projectUserPointBump] =
      this.getProjectUserPointPdaAndBump(taskData.projectId, githubData.wallet);
    const confirmTaskAccounts = {
      feeAndRentPayer: this.feeAndRentKeypair.publicKey,
      task,
      project,
      githubAccount,
      walletAccount,
      projectUserPoint,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    };

    const tx = await this.youbetSolanaProgram.methods
      .confirmTask(taskId, github, 10, taskBump, githubBump, walletBump)
      .accounts(confirmTaskAccounts)
      .signers([this.feeAndRentKeypair])
      .rpc();
    console.log("confirmTask signature", tx);
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

  async donateToProject(
    projectId: string,
    amount: string = "0.01"
  ): Promise<void> {
    const [donatePoolPda, donatePoolBump] = this.getDonatePoolPdaAndBump();
    const [project, projectBump] = this.getProjectAccountPdaAndBump(projectId);
    const projectData = await this.getProject(projectId);
    const donateAccounts: Array<DonateToParams> = new Array(3).fill(null);
    for (let i = 0; i < projectData.participaints.length; i++) {
      const [rewardPda, rewardBump] = this.getRewardPdaAndBump(
        projectData.participaints[i]
      );
      const [projectUserPointPda, projectUserPointBump] =
        this.getProjectUserPointPdaAndBump(
          projectId,
          projectData.participaints[i]
        );
      let donateToParams: DonateToParams = {
        account: projectData.participaints[i],
        rewardPda,
        rewardBump,
        projectUserPointPda,
        projectUserPointBump,
      };
      donateAccounts[i] = donateToParams;
    }

    let donateProjectAccounts = {
      feeAndRentPayer: this.wallet.publicKey,
      project,
      donatePool: donatePoolPda,
      projectUserPoint1: donateAccounts[0]?.projectUserPointPda || null,
      reward1: donateAccounts[0]?.rewardPda || null,
      projectUserPoint2: donateAccounts[1]?.projectUserPointPda || null,
      reward2: donateAccounts[1]?.rewardPda || null,
      projectUserPoint3: donateAccounts[2]?.projectUserPointPda || null,
      reward3: donateAccounts[2]?.rewardPda || null,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    };
    await this.youbetSolanaProgram.methods
      .donateToProject(
        this.parseSOL(amount),
        projectId,
        projectBump,
        donatePoolBump,
        donateAccounts[0]?.account || PublicKey.default,
        donateAccounts[0]?.rewardBump || 255,
        donateAccounts[0]?.projectUserPointBump || 255,
        donateAccounts[1]?.account || PublicKey.default,
        donateAccounts[1]?.rewardBump || 255,
        donateAccounts[1]?.projectUserPointBump,
        donateAccounts[2]?.account || PublicKey.default,
        donateAccounts[2]?.rewardBump || 255,
        donateAccounts[2]?.projectUserPointBump || 255
      )
      .accounts(donateProjectAccounts)
      .rpc();
  }

  async getRewardAmount(user: string): Promise<BN> {}

  async claimReward(): Promise<void> {
    const [donatePoolPda, donatePoolBump] = this.getDonatePoolPdaAndBump();
    const [rewardPda, rewardBump] = this.getRewardPdaAndBump(
      this.wallet.publicKey
    );
    let claimRewardAccounts = {
      feeAndRentPayer: this.wallet.publicKey,
      donatePoolPda,
      rewardPda,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    };
    await this.youbetSolanaProgram.methods
      .claimReward(donatePoolBump, rewardBump)
      .accounts(claimRewardAccounts)
      .rpc();
  }

  parseSOL(value: string) {
    let a = Number(value);
    // Convert the value to a BigInt and multiply by 10^9 (1 billion)
    return new BN(a * LAMPORTS_PER_SOL);
  }
}
