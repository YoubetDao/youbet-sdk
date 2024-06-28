import { useState } from 'react'
import { sdk } from '../../lib/youbet-sdk'
import { Section } from '../Section'

export function StakeAndUnlockGoal() {
  const [goalId, setGoalId] = useState(0)

  const tryMe = async () => {
    await sdk.contract.stakeAndUnlockGoal(goalId, '10', 'wei')
  }

  return (<>
    <Section title="Stake And Unlock Goal">
      <div>
        <label>Goal Id</label>
        <input value={goalId} onChange={(e) => setGoalId(Number(e.target.value))} />
      </div>
      <div>
        <button onClick={tryMe}>Try Me!</button>
      </div>
    </Section>
  </>)
}