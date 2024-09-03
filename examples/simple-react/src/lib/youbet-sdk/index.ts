import {
  SDK,
  type GoalInfo,
  formatResult,
  type Task,
} from "youbet-sdk";

import { openCampusTestOptions } from "./options";

export const sdk = new SDK(openCampusTestOptions);

export { type GoalInfo, type Task, formatResult };
