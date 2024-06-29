import { useState } from 'react'
import { sdk } from '../../lib/youbet-sdk'
import { Section } from '../Section'
import { Button } from '../Button'

export function ContractOwner() {
  const [value, setValue] = useState('')

  const tryMe = async () => {
    const result = await sdk.client.getContractOwner()
    setValue(result)
    console.log(result)
  }

  return (<>
    <Section title="Contract Owner">
      <div>
        <Button onClick={tryMe}>Try Me!</Button>
      </div>
      {!!value && <div>
        <textarea disabled value={value}></textarea>
      </div>}
    </Section>
  </>)
}