import { useState } from 'react'
import { sdk } from '../../lib/youbet-sdk'
import { Section } from '../Section'

export function CreateGoalSolo() {
  const [name, setName] = useState('Test Name Solo')
  const [description, setDescription] = useState('Test Description Solo')
  const [requiredStake, setRequiredStake] = useState(50)
  const [taskCount, setTaskCount] = useState(2)

  const tryMe = async () => {
    if (name === '') {
      alert('name not found')
    }
    if (description === '') {
      alert('description not found')
    }
    await sdk.contract.createGoalSolo(name, description, requiredStake, taskCount)
  }

  return (<>
    <Section title="Create Goal Solo">
      <div>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Required Stake</label>
        <input value={requiredStake} onChange={(e) => setRequiredStake(Number(e.target.value))} />
      </div>
      <div>
        <label>Task Count</label>
        <input value={taskCount} onChange={(e) => setTaskCount(Number(e.target.value))} />
      </div>
      <div>
        <button onClick={tryMe}>Try Me!</button>
      </div>
    </Section>
  </>)
}