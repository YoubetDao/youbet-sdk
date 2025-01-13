import { useState } from "react";
import { sdk } from "../../lib/youbet-sdk";
import { Section } from "../Section";
import { Button } from "../Button";

export function CreateAndConfirmTask() {
  const [id, setId] = useState("2460577971");
  const [name, setName] = useState("YoubetDao/youbet-test-repo/issues/12");
  const [projectId, setProjectId] = useState("829893564");
  const [taskPoints, setTaskPoints] = useState(10);
  const [github, setGithub] = useState("wfnuser");

  const tryMe = async () => {
    const taskInfo = await sdk.contract.createAndConfirmTask(
      id,
      name,
      projectId,
      github,
      taskPoints
    );
    console.log(taskInfo);
  };

  return (
    <>
      <Section title="Create And Confirm Task">
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
          <label>Task Points</label>
          <input
            value={taskPoints}
            onChange={(e) => setTaskPoints(e.target.value)}
          />
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
