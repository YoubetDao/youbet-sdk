import { useState } from 'react'
import { sdk, GoalInfo } from '../../lib/youbet-sdk'
import { Section } from '../Section'
import { GoalInfoTable } from '../GoalInfoTable'

export function GoalDetails() {
  const [goalId, setGoalId] = useState(0)
  const [value, setValue] = useState<GoalInfo>()

  const tryMe = async () => {
    const result = await sdk.client.getGoalDetails(goalId)
    setValue(result)
    console.log(result)
  }

  return (<>
    <Section title="Goal Details">
      <div>
        <label>Goal Id</label>
        <input value={goalId} onChange={(e) => setGoalId(Number(e.target.value))} />
      </div>
      <div>
        <button onClick={tryMe}>Try Me!</button>
      </div>
      {!!value && <div>
        <GoalInfoTable data={value} />
      </div>}
    </Section>
  </>)
}