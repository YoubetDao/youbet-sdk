import { GoalInfo } from "../lib/youbet-sdk"

export function GoalInfoTable({ data }: { data: GoalInfo }) {
  return (<>
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
          <td>name</td>
          <td>{data.name}</td>
        </tr>
        <tr>
          <td>description</td>
          <td>{data.description}</td>
        </tr>
        <tr>
          <td>requiredStake</td>
          <td>{data.requiredStake}</td>
        </tr>
        <tr>
          <td>creator</td>
          <td>{data.creator}</td>
        </tr>
        <tr>
          <td>completed</td>
          <td>{data.completed}</td>
        </tr>
        {data.participants && <tr>
          <td>participants</td>
          <td>{data.participants.join(', ')}</td>
        </tr>}
        <tr>
          <td>goalType</td>
          <td>{data.goalType}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </>)
}