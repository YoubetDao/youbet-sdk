import { useState } from "react";
import { sdk } from "../../lib/youbet-sdk";
import { Section } from "../Section";
import { Button } from "../Button";

export function CreateProject() {
  const [id, setId] = useState("829893564");
  const [name, setName] = useState("YoubetDao/youbet-test-repo/issues/12");

  const tryMe = async () => {
    const taskInfo = await sdk.contract.createProject(id, name);
    console.log(taskInfo);
  };

  return (
    <>
      <Section title="Create Project">
        <div>
          <label>Id: github id</label>
          <input value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div>
          <label>Name: related to github issue</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Button onClick={tryMe}>Try Me!</Button>
        </div>
      </Section>
    </>
  );
}
