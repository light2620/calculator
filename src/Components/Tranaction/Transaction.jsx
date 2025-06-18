import { useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { FaFilter } from "react-icons/fa";
import { LuArrowDownUp } from "react-icons/lu";

const TransactionsTable = () => {
  const data = useSelector((state) => state.allData.data);
  const allTransactions = data?.auction?.value || [];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [columnSorts, setColumnSorts] = useState({});

  const columns = [
    { key: "Date", label: "Date", type: "string" },
    { key: "Auction Sale Price", label: "Price", type: "number" },
    { key: "Odometer", label: "Odo(mi)", type: "number" },
    { key: "CR", label: "Grade", type: "number" },
    { key: "Engine", label: "Eng/T", type: "string" },
    { key: "Color", label: "Ext Color", type: "string" },
    { key: "Series", label: "Type", type: "string" },
    { key: "Region", label: "Region", type: "string" },
    { key: "Auction Location", label: "Auction", type: "string" }
  ];

  const handleColumnSort = (key, type) => {
    setColumnSorts(prev => {
      const current = prev[key] || "none";
      let next = "none";
      if (current === "none") next = "asc";
      else if (current === "asc") next = "desc";
      else next = "none";

      return { ...prev, [key]: next };
    });
  };

 const applySorting = (data) => {
  let result = [...data];
  const activeSorts = Object.entries(columnSorts).filter(([_, dir]) => dir !== "none");

  activeSorts.forEach(([key, direction]) => {
    const column = columns.find(col => col.key === key);
    const type = column?.type;

    result.sort((a, b) => {
      let valA = a[key] ?? "";
      let valB = b[key] ?? "";

      if (type === "number") {
        // Remove commas, currency symbols etc.
        const numA = parseFloat(String(valA).replace(/[^\d.-]/g, "")) || 0;
        const numB = parseFloat(String(valB).replace(/[^\d.-]/g, "")) || 0;
        return direction === "asc" ? numA - numB : numB - numA;
      }

      if (type === "string") {
        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();
        return direction === "asc" ? strA.localeCompare(strB) : strB.localeCompare(strA);
      }

      return 0;
    });
  });

  return result;
};

  const sortedData = applySorting(allTransactions);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  const nextPage = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(prev => prev - 1);

  const exportToCSV = () => {
    const csvRows = [];
    const headers = columns.map(col => col.label);
    csvRows.push(headers.join(","));

    sortedData.forEach(item => {
      const row = columns.map(col => `"${item[col.key] || "-"}"`).join(",");
      csvRows.push(row);
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    link.click();
  };

  return (
    <div className="transactions-container">
      <div className="table-header">
        <h2>Transactions</h2>
        <div className="actions">
          <button className="filter-btn">
            <FaFilter style={{ marginRight: "6px" }} />
            Filters
          </button>
          <button className="download-btn" onClick={exportToCSV}>
            <i className="pi pi-download" style={{ marginRight: "6px" }}></i>
            Download
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              {columns.map((col, idx) => {
                const activeSort = columnSorts[col.key] || "none";
                return (
                  <th key={idx} onClick={() => handleColumnSort(col.key, col.type)}>
                    <div className="th-content">
                      {col.label}
                      <LuArrowDownUp
                        className={`col-filter-icon ${
                          activeSort === "asc" ? "asc" : activeSort === "desc" ? "desc" : ""
                        }`}
                      />
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((item, index) => (
                <tr key={index}>
                  {columns.map((col, i) => (
                    <td key={i}>{item[col.key] || "-"}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="no-data" colSpan={columns.length}>No matching records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>{`${indexOfFirstRow + 1}-${Math.min(indexOfLastRow, sortedData.length)} of ${sortedData.length}`}</span>
        <div className="pagination-controls">
          <button onClick={prevPage} disabled={currentPage === 1}>
            &lt;
          </button>
          <span>{`${currentPage}/${totalPages}`}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
