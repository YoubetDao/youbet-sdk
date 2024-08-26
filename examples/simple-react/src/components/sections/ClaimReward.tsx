import { sdk } from '../../lib/youbet-sdk'
import { Section } from '../Section'
import { Button } from '../Button'

export function ClaimReward() {
  const tryMe = async () => {
    await sdk.contract.claimReward()
  }

  return (<>
    <Section title="Claim Reward">
      <div>
        <Button onClick={tryMe}>Try Me!</Button>
      </div>
    </Section>
  </>)
}