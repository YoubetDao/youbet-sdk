import { Task } from "../lib/youbet-sdk";

export function TaskInfoTable({ data }: { data: Task }) {
  console.log(data);
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>{data.id}</td>
            </tr>
            <tr>
              <td>sub</td>
              <td>{data.sub}</td>
            </tr>
            <tr>
              <td>completed</td>
              <td>{data.completed ? "true" : "false"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
