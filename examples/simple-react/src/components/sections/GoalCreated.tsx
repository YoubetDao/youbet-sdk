// import { useState } from "react"
// import { sdk, GoalInfo, formatResult } from '../../lib/youbet-sdk'

// import { Section } from "../Section"
// import { GoalInfoTable } from '../GoalInfoTable'
// import { Button } from "../Button"

// type GoalInfoEvent = Omit<GoalInfo, 'participants'>

// export function GoalCreated() {
//   const [value, setValue] = useState<GoalInfoEvent[]>([])

//   const tryMe = async () => {
//     const logs = await sdk.event.queryGoalCreated()
//     const result: GoalInfoEvent[] = []
//     for (const log of logs) {
//       if ('args' in log) {
//         const data = formatResult<GoalInfoEvent>(log.args)
//         result.push(data)
//       }
//     }
//     setValue(result)
//     console.log(result)
//   }

//   return (<>
//     <Section title="Goal Created">
//       <div>
//         <Button onClick={tryMe}>Try Me!</Button>
//       </div>
//       {value.map((data) => {
//         return  <GoalInfoTable key={data.id} data={data} />
//       })}
//     </Section>
//   </>)
// }