import { SDK, type GoalInfo, formatResult, type Task } from "youbet-sdk";

import { solanaOptions } from "./options";

export const sdk = new SDK(solanaOptions);

export { type GoalInfo, type Task, formatResult };
