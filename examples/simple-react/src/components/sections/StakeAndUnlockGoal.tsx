import { useState } from 'react'
import { sdk } from '../../lib/youbet-sdk'
import { Section } from '../Section'
import { Button } from '../Button'

export function StakeAndUnlockGoal() {
  const [goalId, setGoalId] = useState(0)

  const tryMe = async () => {
    await sdk.contract.stakeAndUnlockGoal(goalId)
  }

  return (<>
    <Section title="Stake And Unlock Goal">
      <div>
        <label>Goal Id</label>
        <input value={goalId} onChange={(e) => setGoalId(Number(e.target.value))} />
      </div>
      <div>
        <Button onClick={tryMe}>Try Me!</Button>
      </div>
    </Section>
  </>)
}