const TableHead = ({ columns }) => {
  return (
    <thead className="w-full border">
      <tr>
        {columns.map(({ label, accessor }) => {
          return (
            <th
              key={accessor}
              className="px-2 py-2.5 border-b border-white text-left">
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
