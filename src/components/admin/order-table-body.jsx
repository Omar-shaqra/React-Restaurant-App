const TableBody = ({ tableData, columns }) => {
  console.log("tableBody", tableData);
  return (
    <tbody>
      {tableData.data.map((data) => {
        return (
          <tr key={data._id}>
            {columns.map(({ accessor }) => {
              const tData = data[accessor] ? data[accessor] : "——";
              return (
                <td
                  key={accessor}
                  className="border-t border-white px-2 py-2.5">
                  {tData}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
