import { useState } from "react";
import { sdk } from "../../lib/youbet-sdk";
import { Section } from "../Section";
import { Button } from "../Button";

export function CreateTask() {
  const [id, setId] = useState("2460577971");
  const [name, setName] = useState("YoubetDao/youbet-test-repo/issues/12");
  const [projectId, setProjectId] = useState("829893564");

  const tryMe = async () => {
    const taskInfo = await sdk.contract.createTask(id, name, projectId);
    console.log(taskInfo);
  };

  return (
    <>
      <Section title="Create Task">
        <div>
          <label>Id: github id</label>
          <input value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div>
          <label>Name: related to github issue</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>ProjectId: github id</label>
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
