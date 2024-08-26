import { useState } from "react";
import { sdk } from "../../lib/youbet-sdk";
import { Section } from "../Section";
import { Button } from "../Button";

export function GetTotalRewards() {
  const [user, setUser] = useState(
    "0x4808df9a90196d41459a3fe37d76dca32f795338"
  );
  const [value, setValue] = useState(0);

  const tryMe = async () => {
    const result = await sdk.client.getTotalRewards(user);
    setValue(result);
  };

  return (
    <>
      <Section title="Get Total Rewards">
        <div>
          <label>User wallet address</label>
          <input value={user} onChange={(e) => setUser(e.target.value)} />
        </div>
        <div>
          <Button onClick={tryMe}>Try Me!</Button>
        </div>
        {
          <div>
            <textarea disabled value={value}></textarea>
          </div>
        }
      </Section>
    </>
  );
}
