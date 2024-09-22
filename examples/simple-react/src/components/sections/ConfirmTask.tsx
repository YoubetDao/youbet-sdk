import { useState } from "react";
import { sdk } from "../../lib/youbet-sdk";
import { Section } from "../Section";
import { Button } from "../Button";

export function ConfirmTask() {
  const [taskId, setTaskId] = useState("2460577971");
  const [github, setGithub] = useState("wfnuser");
  const [taskPoints, setTaskPoints] = useState(10);
  const tryMe = async () => {
    const taskInfo = await sdk.contract.confirmTask(taskId, github, taskPoints);
    console.log(taskInfo);
  };

  return (
    <>
      <Section title="Confirm Task">
        <div>
          <label>TaskId</label>
          <input value={taskId} onChange={(e) => setTaskId(e.target.value)} />
        </div>
        <div>
          <label>Github</label>
          <input value={github} onChange={(e) => setGithub(e.target.value)} />
        </div>
        <div>
          <label>Task Points</label>
          <input
            value={taskPoints}
            onChange={(e) => setTaskPoints(e.target.value)}
          />
        </div>
        <div>
          <Button onClick={tryMe}>Try Me!</Button>
        </div>
      </Section>
    </>
  );
}
