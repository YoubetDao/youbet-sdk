import { SDK, NetworkType, type GoalInfo, formatResult } from 'youbet-sdk'

export const sdk = new SDK({ networkType: NetworkType.Testnet });

export { type GoalInfo, formatResult }