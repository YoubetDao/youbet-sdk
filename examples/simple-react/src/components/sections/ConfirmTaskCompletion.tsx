import { useState } from 'react'
import { sdk } from '../../lib/youbet-sdk'
import { Section } from '../Section'

export function ConfirmTaskCompletion() {
  const [goalId, setGoalId] = useState(0)
  const [userAddress, setUserAddress] = useState('')

  const tryMe = async () => {
    await sdk.contract.confirmTaskCompletion(goalId, userAddress)
  }

  return (<>
    <Section title="Confirm Task Completion">
      <div>
        <label>Goal Id</label>
        <input value={goalId} onChange={(e) => setGoalId(Number(e.target.value))} />
      </div>
      <div>
        <label>User Address</label>
        <input value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
      </div>
      <div>
        <button onClick={tryMe}>Try Me!</button>
      </div>
    </Section>
  </>)
}