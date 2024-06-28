import { useState } from "react"
import { sdk, GoalInfo } from '../../lib/youbet-sdk'

import { Section } from "../Section"
import { GoalInfoTable } from '../GoalInfoTable'

export function AllGoals() {
  const [value, setValue] = useState<GoalInfo[]>([])

  const tryMe = async () => {
    const result = await sdk.client.getAllGoals()
    setValue(result)
    console.log(result)
  }

  return (<>
    <Section title="All Goals">
      <div>
        <button onClick={tryMe}>Try Me!</button>
      </div>
      {value.map((data) => {
        return  <GoalInfoTable key={data.id} data={data} />
      })}
    </Section>
  </>)
}