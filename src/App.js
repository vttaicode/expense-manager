import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ExpenseItem = ({ expense, onDelete }) => {
  const getColorClass = () => {
    if (expense.category === "Mua sắm" || expense.category === "Giải trí") return "bg-danger text-white";
    return "bg-warning";
  };

  return (
    <div className={`d-flex justify-content-between align-items-center rounded p-3 mb-2 ${getColorClass()}`}>
      <div>
        <strong>{expense.category}</strong> - {expense.note}<br />
        {expense.amount.toLocaleString()} VND
      </div>
      <button className="btn btn-sm btn-danger" onClick={() => onDelete(expense.id)}>✕</button>
    </div>
  );
};

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Mua sắm");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!note.trim() || isNaN(amount) || Number(amount) <= 0) return;
    const newExpense = {
      id: Date.now(),
      note,
      amount: Number(amount),
      category,
    };
    setExpenses([...expenses, newExpense]);
    setNote("");
    setAmount("");
    setCategory("Mua sắm");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="container py-4" style={{ maxWidth: "600px" }}>
      <div className="border p-4 rounded bg-light">
        <h2 className="text-center fw-bold mb-4">Quản lý Chi Tiêu</h2>
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} onDelete={deleteExpense} />
        ))}
        <div className="mt-3 fw-bold text-end">
          Tổng chi: {total.toLocaleString()} VND
        </div>
      </div>

      <div className="card p-3 mt-4">
        <h5>Thêm Chi Tiêu</h5>
        <div className="row g-2">
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Nội dung"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="col-3">
            <input
              type="number"
              className="form-control"
              placeholder="Số tiền"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="col-3">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Mua sắm">Mua sắm</option>
              <option value="Ăn uống">Ăn uống</option>
              <option value="Xăng xe">Xăng xe</option>
              <option value="Giải trí">Giải trí</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary w-100 mt-3" onClick={addExpense}>
          Thêm Chi Tiêu
        </button>
      </div>
    </div>
  );
};

export default ExpenseTracker;