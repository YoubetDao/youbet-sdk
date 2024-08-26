import { useState } from "react";
import { sdk } from "../../lib/youbet-sdk";

import { Section } from "../Section";
import { Button } from "../Button";

export function AllProjects() {
  const [value, setValue] = useState<any[]>([]);

  const tryMe = async () => {
    const result = await sdk.client.getAllProjectIds();
    setValue(result);
  };

  return (
    <>
      <Section title="All Project Ids">
        <div>
          <Button onClick={tryMe}>Try Me!</Button>
        </div>
        {value.map((data) => {
          return <div key={data}>{data}</div>;
        })}
      </Section>
    </>
  );
}
