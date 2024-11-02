import { useState } from "react";
import { sdk } from "../../lib/youbet-sdk";

import { Section } from "../Section";
import { Button } from "../Button";
import { TaskInfoTable } from "../TaskInfoTable";

export function GetTask() {
	const [id, setId] = useState("");

	const [value, setValue] = useState<any[]>([]);

	const tryMe = async () => {
		const result = await sdk.client.getTask(id);
		setValue([result]);
	};

	return (
		<>
			<Section title="Get Task By Id">
				<div>
					<label>Task Id</label>
					<input value={id} onChange={(e) => setId(e.target.value)} />
				</div>
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
