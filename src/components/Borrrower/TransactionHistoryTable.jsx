// Thêm các props mới: enablePagination, enableExport
import React, { useState } from "react";
import { saveAs } from "file-saver";

export default function TransactionHistoryTable({ address, darkMode, enablePagination, enableExport }) {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [allTxs, setAllTxs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch txs (giả lập, cần thay bằng API thật)
  React.useEffect(() => {
    if (!address) return;
    setLoading(true);
    setError("");
    const apiKey = import.meta.env.VITE_ETHERSCAN_API_KEY || "";
    if (!apiKey) {
      setError("API key chưa được cấu hình. Thêm VITE_ETHERSCAN_API_KEY vào file .env và khởi động lại server.");
      setLoading(false);
      return;
    }
    // Chỉ dùng Etherscan V1 cho Sepolia
    fetch(`https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&page=${page}&offset=${pageSize}&sort=desc&apikey=${apiKey}`)
      .then(r => r.json())
      .then(data => {
        if (data.status === "1" && Array.isArray(data.result) && data.result.length > 0) {
          setAllTxs(prev => page === 1 ? data.result : [...prev, ...data.result]);
        } else if (data.status === "1" && Array.isArray(data.result) && data.result.length === 0) {
          setError("Địa chỉ ví không có giao dịch trên Sepolia.");
        } else {
          setError(
            'Lỗi API: ' + (data.message || 'Không có dữ liệu giao dịch hoặc lỗi API.') +
            '\nStatus: ' + data.status +
            '\nResult: ' + JSON.stringify(data.result) +
            '\nCó thể bị giới hạn tốc độ, hãy thử lại sau hoặc giảm tần suất gọi.'
          );
        }
        setLoading(false);
      })
      .catch(err => {
        setError("Lỗi khi lấy dữ liệu giao dịch.\nKiểm tra kết nối mạng hoặc API key.");
        setLoading(false);
      });
  }, [address, page]);

  // Export CSV
  function exportCSV() {
    if (!allTxs.length) return;
    const header = Object.keys(allTxs[0]).join(",");
    const rows = allTxs.map(tx => Object.values(tx).join(","));
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `tx-history-${address}.csv`);
  }

  // Export Excel (simple CSV for now)
  function exportExcel() {
    exportCSV();
  }

  return (
    <div style={{ marginTop: 12 }}>
      {loading && <div>Đang tải lịch sử giao dịch...</div>}
      {error && <div style={{ color: "#e74c3c" }}>{error}</div>}
      {enableExport && allTxs.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          <button onClick={exportCSV} style={{ marginRight: 8 }}>Export CSV</button>
          <button onClick={exportExcel}>Export Excel</button>
        </div>
      )}
      <table style={{ width: "100%", background: darkMode ? "#23272f" : "#fff", color: darkMode ? "#fff" : "#23272f", borderRadius: 8 }}>
        <thead>
          <tr>
            <th>Hash</th>
            <th>Block</th>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {allTxs.map(tx => (
            <tr key={tx.hash}>
              <td title={tx.hash}>{tx.hash.slice(0, 10)}...</td>
              <td>{tx.blockNumber}</td>
              <td title={tx.from}>{tx.from.slice(0, 10)}...</td>
              <td title={tx.to}>{tx.to ? tx.to.slice(0, 10) + "..." : ""}</td>
              <td>{parseFloat(tx.value) / 1e18} ETH</td>
              <td>{new Date(tx.timeStamp * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {enablePagination && (
        <div style={{ marginTop: 12, textAlign: "center" }}>
          <button onClick={() => setPage(p => p + 1)} disabled={loading} style={{ padding: "8px 18px", borderRadius: 6, background: "#1976d2", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer" }}>Tải thêm</button>
        </div>
      )}
    </div>
  )}