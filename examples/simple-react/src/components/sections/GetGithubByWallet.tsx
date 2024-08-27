import { useState } from "react";
import { sdk } from "../../lib/youbet-sdk";
import { Section } from "../Section";
import { Button } from "../Button";

export function GetGithubByWallet() {
  const [wallet, setWallet] = useState(
    "0x4808df9a90196d41459a3Fe37D76DCa32F795338"
  );
  const [value, setValue] = useState("");

  const tryMe = async () => {
    const result = await sdk.client.getGithubByWallet(wallet);
    setValue(result);
  };

  return (
    <>
      <Section title="Get Project Participants">
        <div>
          <label>Wallet</label>
          <input value={wallet} onChange={(e) => setWallet(e.target.value)} />
        </div>
        <div>
          <Button onClick={tryMe}>Try Me!</Button>
        </div>
        {value}
      </Section>
    </>
  );
}
