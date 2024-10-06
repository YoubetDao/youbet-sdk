import {
  SDK,
  type GoalInfo,
  formatResult,
  type Task,
} from "youbet-sdk";

import { neoTestOptions, openCampusTestOptions } from "./options";

export const sdk = new SDK(neoTestOptions);

export { type GoalInfo, type Task, formatResult };
