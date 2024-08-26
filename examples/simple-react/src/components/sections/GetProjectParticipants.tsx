import { useState } from "react";
import { sdk } from "../../lib/youbet-sdk";
import { Section } from "../Section";
import { Button } from "../Button";

export function GetProjectParticipants() {
  const [projectId, setProjectId] = useState("829893564");
  const [value, setValue] = useState<string[]>([]);

  const tryMe = async () => {
    const result = await sdk.client.getProjectParticipants(projectId);
    setValue(result);
  };

  return (
    <>
      <Section title="Get Project Participants">
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
        {value.map((data) => {
          return <div key={data}>address: {data}</div>;
        })}
      </Section>
    </>
  );
}
