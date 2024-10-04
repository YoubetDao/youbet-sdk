import { AnchorProvider, Idl, Program, Wallet } from "@coral-xyz/anchor";

import type { YoubetSolanaProgram } from "../lib/idl/youbet_solana_program";
import idl from "../lib/idl/youbet_solana_program.json";

import {
  Connection,
  Keypair,
  PublicKey,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";

const ADMIN_CONFIG_PREFIX: string = "ADMIN_CONFIG_PREFIX";
const PROJECT_PREFIX: string = "PROJECT";
const TASK_PREFIX: string = "TASK";
const PROJECT_USER_POINT_PREFIX: string = "PROJECT_USER_POINT";
const WALLET_PREFIX: string = "WALLET";
const GITHUB_PREFIX: string = "GITHUB";

export class YoubetSolanaProgramLib {
  youbetSolanaProgram: Program<YoubetSolanaProgram>;
  connection: Connection;
  feeAndRentKeypair: Keypair;

  constructor(
    connection: Connection,
    wallet: Wallet,
    feeAndRentKeypair: Keypair
  ) {
    this.connection = connection;
    const provider = new AnchorProvider(
      connection,
      wallet,
      AnchorProvider.defaultOptions()
    );
    this.youbetSolanaProgram = new Program(
      idl as Idl,
      provider
    ) as unknown as Program<YoubetSolanaProgram>;
    this.feeAndRentKeypair = feeAndRentKeypair;
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
  async setAdminConfigAccount(
    feeAndRentPayer: Keypair,
    authority: Keypair
  ): Promise<void> {
    const [adminConfig, adminBump] = this.getAdminConfigAccountPdaAndBump();
    let initializeAccounts = {
      feeAndRentPayer: feeAndRentPayer.publicKey,
      authority: authority.publicKey,
      adminConfig,
      systemProgram: new PublicKey("11111111111111111111111111111111"),
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
    const [adminConfig, adminBump] = this.getAdminConfigAccountPdaAndBump();
    const adminConfigData =
      await this.youbetSolanaProgram.account.adminConfigAccount.fetch(
        adminConfig.toBase58()
      );
    return adminConfigData;
  }
  async createTask(id: string, name: string, projectId: string): Promise<void> {
    const [task, taskBump] = this.getTaskAccountPdaAndBump(id);
    const [project, projectBump] = this.getProjectAccountPdaAndBump(projectId);
    let createTaskAccounts = {
      feeAndRentPayer: this.feeAndRentKeypair.publicKey,
      task,
      project,
      systemProgram: new PublicKey("11111111111111111111111111111111"),
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
    const [task, taskBump] = this.getTaskAccountPdaAndBump(id);
    const taskData = await this.youbetSolanaProgram.account.taskAccount.fetch(
      task.toBase58()
    );
    return taskData;
  }
  async createProject(id: string, name: string): Promise<void> {
    const [project, projectBump] = this.getProjectAccountPdaAndBump(id);
    let createProjectAccounts = {
      feeAndRentPayer: this.feeAndRentKeypair.publicKey,
      project,
      systemProgram: new PublicKey("11111111111111111111111111111111"),
      rent: SYSVAR_RENT_PUBKEY,
    };
    const tx = await this.youbetSolanaProgram.methods
      .createProject(id, id)
      .accounts(createProjectAccounts)
      .signers([this.feeAndRentKeypair])
      .rpc();
    console.log("createProject signature", tx);
  }
  async getProject(id: string): Promise<any> {
    const [project, projectBump] = this.getProjectAccountPdaAndBump(id);
    const projectData =
      await this.youbetSolanaProgram.account.projectAccount.fetch(
        project.toBase58()
      );
    return projectData;
  }
  async isProjectExisted(id: string): Promise<boolean> {
    const [project, projectBump] = this.getProjectAccountPdaAndBump(id);
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
    const [walletAccount, walletBump] = this.getWalletAccountPdaAndBump(wallet);
    const [githubAccount, githubBump] = this.getGithubAccountPdaAndBump(github);

    let createLinkWalletAccounts = {
      feeAndRentPayer: this.feeAndRentKeypair.publicKey,
      adminConfig: adminConfig,
      walletAccount,
      githubAccount,
      systemProgram: new PublicKey("11111111111111111111111111111111"),
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
    const [walletAccount, walletBump] =
      this.getWalletAccountPdaAndBump(walletPk);
    const walletData =
      await this.youbetSolanaProgram.account.walletAccount.fetch(
        walletAccount.toBase58()
      );
    return walletData.github;
  }
  async getWalletByGithub(github: string): Promise<any> {
    const [githubAccount, githubBump] = this.getGithubAccountPdaAndBump(github);
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
    const [project, projectBump] = this.getProjectAccountPdaAndBump(
      taskData.projectId
    );
    const [projectUserPoint, projectUserPointBump] =
      this.getProjectUserPointPdaAndBump(taskData.projectId, githubData.wallet);
    const confirmTaskAccounts = {
      feeAndRentPayer: this.feeAndRentKeypair.publicKey,
      task,
      project,
      githubAccount,
      walletAccount,
      projectUserPoint,
      systemProgram: new PublicKey("11111111111111111111111111111111"),
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
    const [walletAccount, walletBump] =
      this.getWalletAccountPdaAndBump(walletPk);
    const walletData =
      await this.youbetSolanaProgram.account.walletAccount.fetch(
        walletAccount.toBase58()
      );
    return walletData.userPoint;
  }
  async getUserCompletedTasks(user: string): Promise<Array<any>> {
    const walletPk = new PublicKey(user);
    const [walletAccount, walletBump] =
      this.getWalletAccountPdaAndBump(walletPk);
    const walletData =
      await this.youbetSolanaProgram.account.walletAccount.fetch(
        walletAccount.toBase58()
      );
    return walletData.completedTasks;
  }
}
