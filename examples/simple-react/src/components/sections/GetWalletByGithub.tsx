import { useState } from "react";
import { sdk } from "../../lib/youbet-sdk";
import { Section } from "../Section";
import { Button } from "../Button";

export function GetWalletByGithub() {
  const [github, setGithub] = useState("wfnuser");
  const [value, setValue] = useState("");

  const tryMe = async () => {
    const result = await sdk.client.getWalletByGithub(github);
    setValue(result);
  };

  return (
    <>
      <Section title="Get Project Participants">
        <div>
          <label>Github</label>
          <input value={github} onChange={(e) => setGithub(e.target.value)} />
        </div>
        <div>
          <Button onClick={tryMe}>Try Me!</Button>
        </div>
        {value}
      </Section>
    </>
  );
}
