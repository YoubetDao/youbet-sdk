# youbet-sdk

## Introduction

This SDK allows you to interact with a smart contract deployed on the Ethereum blockchain. It provides various methods to manage goals, including creating goals, staking, confirming task completion, and more.

## Installation

First, you need to install the required dependencies. Make sure you have Node.js and npm installed.

```bash
npm install ethers
```

## Usage

### Importing the SDK

To use the SDK, import it into your project along with any other necessary dependencies.

```javascript
import { SDK } from './sdk';
```

### Initializing the SDK

Create an instance of the SDK by providing the contract address, ABI (optional), and the provider URL.

```javascript
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const providerUrl = 'YOUR_PROVIDER_URL';
const sdk = new SDK(contractAddress, null, providerUrl);
```

### Methods

#### claimStake(goalId: number): Promise<void>

Claims the stake for a specific goal.

```javascript
await sdk.claimStake(1);
```

#### confirmTaskCompletion(goalId: number, user: string): Promise<void>

Confirms the completion of a task for a specific goal by a user.

```javascript
await sdk.confirmTaskCompletion(1, '0xUserAddress');
```

#### getContractOwner(): Promise<string>

Returns the owner of the contract.

```javascript
const owner = await sdk.getContractOwner();
console.log(owner);
```

#### createGoal(name: string, description: string, requiredStake: number, taskCount: number): Promise<void>

Creates a new goal.

```javascript
await sdk.createGoal('Goal Name', 'Goal Description', 100, 5);
```

#### createGoalSolo(name: string, description: string, requiredStake: number, taskCount: number): Promise<void>

Creates a new solo goal.

```javascript
await sdk.createGoalSolo('Solo Goal Name', 'Solo Goal Description', 100, 5);
```

#### getAllGoals(): Promise<GoalInfo[]>

Retrieves all goals.

```javascript
const goals = await sdk.getAllGoals();
console.log(goals);
```

#### getGoalDetails(goalId: number): Promise<GoalInfo>

Retrieves details of a specific goal.

```javascript
const goal = await sdk.getGoalDetails(1);
console.log(goal);
```

#### getUserGoals(user: string): Promise<number[]>

Retrieves the goals associated with a specific user.

```javascript
const userGoals = await sdk.getUserGoals('0xUserAddress');
console.log(userGoals);
```

#### settleGoal(goalId: number): Promise<void>

Settles a specific goal.

```javascript
await sdk.settleGoal(1);
```

#### stakeAndUnlockGoal(goalId: number, value: string): Promise<void>

Stakes and unlocks a specific goal.

```javascript
await sdk.stakeAndUnlockGoal(1, '1000000000000000000'); // Value in wei
```

## ABI

If you have a custom ABI, you can pass it to the SDK during initialization. Otherwise, the default ABI provided in `./lib/abi/bet.json` will be used.

```javascript
const customAbi = [ /* Your custom ABI */ ];
const sdk = new SDK(contractAddress, customAbi, providerUrl);
```

## Provider URL

The provider URL is the endpoint of your Ethereum node. You can use providers like Infura, Alchemy, or your own Ethereum node.

```javascript
const providerUrl = 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID';
```

## Conclusion

This SDK provides a convenient way to interact with the smart contract and manage goals. Ensure you handle errors and edge cases appropriately in your implementation.

For further details on each method and additional functionality, refer to the code comments and the smart contract documentation.