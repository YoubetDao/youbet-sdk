import { useState } from 'react'
import { sdk } from '../../lib/youbet-sdk'
import { Section } from '../Section'
import { Button } from '../Button'

export function CreateTask() {
  const [sub, setSub] = useState('YoubetDao/youbet-web3-allin/issues/1')

  const tryMe = async () => {
    const taskInfo = await sdk.contract.createTask(sub)
    console.log(taskInfo)
  }

  return (<>
    <Section title="Create Task">
      <div>
        <label>Sub: related to github issue</label>
        <input value={sub} onChange={(e) => setSub(e.target.value)} />
      </div>
      <div>
        <Button onClick={tryMe}>Try Me!</Button>
      </div>
    </Section>
  </>)
}