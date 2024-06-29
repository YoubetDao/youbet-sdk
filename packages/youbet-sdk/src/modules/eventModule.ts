import { CommonModule } from './commonModule';

export class EventModule extends CommonModule {
  async queryGoalCreated() {
    const contract = await this._getContract();
    return contract.queryFilter(contract.filters.GoalCreated());
  }

  async queryGoalSettled() {
    const contract = await this._getContract();
    return contract.queryFilter(contract.filters.GoalSettled());
  }

  async queryGoalUnlocked() {
    const contract = await this._getContract();
    return contract.queryFilter(contract.filters.GoalUnlocked());
  }

  async queryStakeClaimed() {
    const contract = await this._getContract();
    return contract.queryFilter(contract.filters.StakeClaimed());
  }

  async queryTaskConfirmed() {
    const contract = await this._getContract();
    return contract.queryFilter(contract.filters.TaskConfirmed());
  }
}
