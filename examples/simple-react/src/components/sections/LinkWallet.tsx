import { useState } from "react";
import { sdk } from "../../lib/youbet-sdk";
import { Section } from "../Section";
import { Button } from "../Button";

export function LinkWallet() {
  const [user, setUser] = useState(
    "0x4808df9a90196d41459a3fe37d76dca32f795338"
  );
  const [github, setGithub] = useState("wfnuser");

  const tryMe = async () => {
    const taskInfo = await sdk.contract.linkWallet(user, github);
    console.log(taskInfo);
  };

  return (
    <>
      <Section title="Link Wallet">
        <div>
          <label>User wallet address</label>
          <input value={user} onChange={(e) => setUser(e.target.value)} />
        </div>
        <div>
          <label>Github</label>
          <input value={github} onChange={(e) => setGithub(e.target.value)} />
        </div>

        <div>
          <Button onClick={tryMe}>Try Me!</Button>
        </div>
      </Section>
    </>
  );
}
