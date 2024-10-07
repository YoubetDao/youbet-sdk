import { useState } from "react";
import { sdk } from "../../lib/youbet-sdk";
import { Section } from "../Section";
import { Button } from "../Button";

export function DonateToProject() {
  const [projectId, setProjectId] = useState("829893564");

  const tryMe = async () => {
    const taskInfo = await sdk.contract.donateToProject(projectId, "0.1");
    console.log(taskInfo);
  };

  return (
    <>
      <Section title="Donate To Project">
        <div>
          <label>ProjectId</label>
          <input
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        </div>
        <div>
          <Button onClick={tryMe}>Try Me!</Button>
        </div>
      </Section>
    </>
  );
}
