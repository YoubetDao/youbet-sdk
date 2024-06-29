# Quick Start Guide for YouBet SDK

This guide will help you set up a project using the YouBet SDK with Vite, React, and TypeScript.

## Prerequisites

Make sure you have the following installed:
- Node.js
- pnpm

## Step 1: Create a New Vite Project

First, create a new Vite project with React and TypeScript.

```bash
pnpm create vite youbet-app --template react-ts
cd youbet-app
```

## Step 2: Install the Youbet SDK

Install the Youbet SDK using pnpm.

```bash
pnpm add youbet-sdk
```

## Step 3: Initialize the SDK

Create a new file `src/sdk.ts` and initialize the SDK.

```typescript
// src/sdk.ts
import { SDK, NetworkType } from 'youbet-sdk';

const sdk = new SDK({
  privateKey: 'your-private-key', // optional
  networkType: NetworkType.Mainnet // or NetworkType.Testnet
});

export default sdk;
```

## Step 4: Use SDK Methods in Your React Components

Now you can use the SDK methods in your React components. Here is an example of how to use some of the Client module methods.

```typescript
// src/App.tsx
import React, { useEffect, useState } from 'react';
import sdk from './sdk';

const App: React.FC = () => {
  const [owner, setOwner] = useState<string>('');
  const [goals, setGoals] = useState<any[]>([]);

  useEffect(() => {
    const fetchOwner = async () => {
      const contractOwner = await sdk.client.getContractOwner();
      setOwner(contractOwner);
    };

    const fetchGoals = async () => {
      const allGoals = await sdk.client.getAllGoals();
      setGoals(allGoals);
    };

    fetchOwner();
    fetchGoals();
  }, []);

  return (
    <div>
      <h1>Contract Owner: {owner}</h1>
      <h2>All Goals:</h2>
      <ul>
        {goals.map((goal, index) => (
          <li key={index}>{goal.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
```

## Step 5: Using Contract Module Methods

You can also use the Contract module methods to interact with the contract. Here's an example of how to create a new goal.

```typescript
// src/CreateGoal.tsx
import React, { useState } from 'react';
import sdk from './sdk';

const CreateGoal: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [stake, setStake] = useState<number>(0);
  const [taskCount, setTaskCount] = useState<number>(0);
  const [goalInfo, setGoalInfo] = useState<any>(null);

  const createGoal = async () => {
    const newGoal = await sdk.contract.createGoal(name, description, stake, taskCount);
    setGoalInfo(newGoal);
  };

  return (
    <div>
      <h2>Create a New Goal</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Required Stake"
        value={stake}
        onChange={(e) => setStake(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Task Count"
        value={taskCount}
        onChange={(e) => setTaskCount(Number(e.target.value))}
      />
      <button onClick={createGoal}>Create Goal</button>
      {goalInfo && (
        <div>
          <h3>Goal Created:</h3>
          <p>Name: {goalInfo.name}</p>
          <p>Description: {goalInfo.description}</p>
          <p>Stake: {goalInfo.requiredStake}</p>
          <p>Task Count: {goalInfo.taskCount}</p>
        </div>
      )}
    </div>
  );
};

export default CreateGoal;
```

## Step 6: Run Your Project

Start your Vite development server.

```bash
pnpm run dev
```

Open your browser and navigate to the URL provided by Vite (typically `http://localhost:3000`). You should now see your React app using the YouBet SDK.

## Learn More

For more detailed information, refer to the [YouBet SDK documentation](https://youbetdao.github.io/).

Now you have a basic setup to start using the YouBet SDK with Vite, React, and TypeScript. Happy coding!