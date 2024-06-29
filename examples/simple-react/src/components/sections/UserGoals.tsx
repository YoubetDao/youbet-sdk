import { useState } from 'react'
import { sdk } from '../../lib/youbet-sdk'
import { Section } from '../Section'
import { Button } from '../Button'

export function UserGoals() {
  const [userAddress, setUserAddress] = useState('')
  const [value, setValue] = useState<number[]>([])

  const tryMe = async () => {
    const result = await sdk.client.getUserGoals(userAddress)
    setValue(result)
    console.log(result)
  }

  return (<>
    <Section title="User Goals">
      <div>
        <label>User Address</label>
        <input value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
      </div>
      <div>
        <Button onClick={tryMe}>Try Me!</Button>
      </div>
      {!!value.length && <div>
        <textarea disabled value={value.join(',')} />
      </div>}
    </Section>
  </>)
}