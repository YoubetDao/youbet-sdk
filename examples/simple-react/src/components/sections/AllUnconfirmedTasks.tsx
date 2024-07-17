import { useState } from "react";
import { sdk } from "../../lib/youbet-sdk";

import { Section } from "../Section";
import { Button } from "../Button";
import { TaskInfoTable } from "../TaskInfoTable";

export function AllUnconfirmedTasks() {
  const [value, setValue] = useState<any[]>([]);

  const tryMe = async () => {
    const result = await sdk.client.getUnconfirmedTasks();
    setValue(result);
  };

  return (
    <>
      <Section title="All Unconfirmed Tasks">
        <div>
          <Button onClick={tryMe}>Try Me!</Button>
        </div>
        {value.map((data) => {
          return <TaskInfoTable key={data.id} data={data} />;
        })}
      </Section>
    </>
  );
}
