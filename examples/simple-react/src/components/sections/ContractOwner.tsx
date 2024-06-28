import { useState } from 'react'
import { sdk } from '../../lib/youbet-sdk'
import { Section } from '../Section'

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
        <button onClick={tryMe}>Try Me!</button>
      </div>
      {!!value && <div>
        <textarea disabled value={value}></textarea>
      </div>}
    </Section>
  </>)
}