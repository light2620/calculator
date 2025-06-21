import { useEffect, useState } from "react";
import "./style.css";

const API_BASE = "https://reportingbackend.campingx.net";

function Table() {
  const [expenses, setExpenses] = useState([]);
  const [locationId] = useState("lXqUG5UDmVTUwxr7W0HQ");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, [page, pageSize, startMonth, endMonth]);

  const fetchExpenses = async () => {
    let url = `${API_BASE}/miscellaneous-expenses/?location_id=${locationId}&page=${page}&page_size=${pageSize}`;
    if (startMonth) url += `&start_month=${startMonth}`;
    if (endMonth) url += `&end_month=${endMonth}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Invalid page");
      const data = await res.json();
     console.log(data)
      setExpenses(data.results);
      const totalPages = Math.ceil(data.count / pageSize);
      setHasNextPage(page < totalPages);
    } catch (err) {
      if (page > 1) {
        setPage((prev) => prev - 1);
      }
    }
  };

  const updateExpense = async (month, value) => {
    const payload = {
      ghl_location_id: locationId,
      miscellaneous_expenses: parseFloat(value),
      month
    };

    await fetch(`${API_BASE}/update-miscellaneous-expense/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setEditIndex(null);
    fetchExpenses();
  };

  const handleInputChange = (index, value) => {
    const newExpenses = [...expenses];
    newExpenses[index].miscellaneous_expenses = value;
    setExpenses(newExpenses);
  };

  const formatExpense = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  return (
    <div className="container">
      <h1 className="title">Miscellaneous Expenses</h1>

      <div className="filters">
        <input
          type="month"
          value={startMonth}
          onChange={(e) => setStartMonth(e.target.value)}
          className="input"
        />
        <input
          type="month"
          value={endMonth}
          onChange={(e) => setEndMonth(e.target.value)}
          className="input"
        />
        <select
          className="input"
          value={pageSize}
          onChange={(e) => {
            setPageSize(parseInt(e.target.value));
            setPage(1);
          }}
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
        </select>
        <button className="btn" onClick={() => fetchExpenses()}>
          Apply Filters
        </button>
      </div>

      <div className="table-wrapper">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Expense ($)</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, idx) => (
              <tr key={exp.month}>
                <td>{exp.month}</td>
                <td>
                  <div className="editable-cell">
                    {editIndex === idx ? (
                      <input
                        type="number"
                        value={exp.miscellaneous_expenses}
                        className="input"
                        onChange={(e) => handleInputChange(idx, e.target.value)}
                        onBlur={() => updateExpense(exp.month, exp.miscellaneous_expenses)}
                        autoFocus
                      />
                    ) : (
                      <>
                        <span>{formatExpense(exp.miscellaneous_expenses)}</span>
                        <button className="edit-btn" onClick={() => setEditIndex(idx)} title="Edit">
                          ✏️
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="btn" onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Prev
        </button>
        <span className="page-info">Page {page}</span>
        <button className="btn" onClick={() => hasNextPage && setPage((p) => p + 1)} disabled={!hasNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Table;
