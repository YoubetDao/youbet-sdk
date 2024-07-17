import {
  SDK,
  NetworkType,
  type GoalInfo,
  formatResult,
  type Task,
} from "youbet-sdk";

export const sdk = new SDK({ networkType: NetworkType.Testnet });

export { type GoalInfo, type Task, formatResult };
