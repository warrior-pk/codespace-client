const Table = ({ data = [] }) => {
  return (
    <table className="submission-table table-auto">
      <thead className="border-b px-2 py-4 rounded-md backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30">
        <tr>
          <th>When</th>
          <th>Who</th>
          <th>Lang</th>
          <th>Code</th>
          <th>Stdin</th>
          <th>Verdict</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr
            key={index}
            className={
              index % 2 === 0 ? "bg-zinc-700/60 backdrop-blur-2xl" : ""
            }
          >
            <td className="cell">{entry.userId}</td>
            <td className="cell">{entry.cuisine}</td>
            <td className="cell">{entry.name}</td>
            <td className="cell">
              {entry.instructions[0].length > 100
                ? entry.instructions[0].substring(0, 100) + "..."
                : entry.instructions[0]}
            </td>
            <td className="cell">
              {entry.ingredients[0].length > 30
                ? entry.ingredients[0].substring(0, 30) + "..."
                : entry.ingredients[0]}
            </td>
            <td
              className={
                entry.difficulty === "Easy"
                  ? "text-green-400 cell"
                  : "text-red-500 cell"
              }
            >
              {entry.difficulty}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
