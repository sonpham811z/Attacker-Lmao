import React, { useState } from "react";
import TopBar from "../components/TopBar";

const mockRwaNfts = [
  { id: "nft1", name: "RWA-NFT #1" },
  { id: "nft2", name: "RWA-NFT #2" },
  { id: "nft3", name: "RWA-NFT #3" },
];

const STATUS_LABELS = {
  open: "Mở",
  pending: "Đang chờ",
  funded: "Đã được tài trợ",
  rejected: "Đã từ chối",
};

export default function Loans() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    interest: "",
    duration: "",
    rwaNft: "",
  });
  const [status, setStatus] = useState("open");

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isBig = Number(form.amount) >= 10000;
    if (isBig && !form.rwaNft) {
      alert("Khoản vay lớn cần chọn RWA-NFT làm tài sản thế chấp!");
      return;
    }
    setRequests([
      {
        id: Date.now(),
        amount: form.amount,
        interest: form.interest,
        duration: form.duration,
        rwaNft: isBig ? form.rwaNft : null,
        status: "pending",
      },
      ...requests,
    ]);
    setForm({ amount: "", interest: "", duration: "", rwaNft: "" });
    setStatus("open");
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f3ff 0%, #e0e7ff 100%)", padding: 0, width: "100vw" }}>
      <TopBar pageTitle="Loans" />
      <div style={{ display: "flex", justifyContent: "center", width: "100%", minHeight: "calc(100vh - 64px)", alignItems: "center" }}>
        <div style={{ width: 600, padding: 32, background: "#fff", borderRadius: 18, boxShadow: "0 2px 16px #1976d222" }}>
        <h1 style={{ color: "#1976d2", fontWeight: 800, fontSize: 32, marginBottom: 24 }}>Tạo yêu cầu vay</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
          <input
            name="amount"
            type="number"
            placeholder="Số tiền muốn vay (USDC)"
            value={form.amount}
            onChange={handleChange}
            style={{ padding: 12, borderRadius: 8, border: "1px solid #bdbdbd", fontSize: 18 }}
            required
          />
          <input
            name="interest"
            type="number"
            placeholder="Lãi suất mong muốn (%)"
            value={form.interest}
            onChange={handleChange}
            style={{ padding: 12, borderRadius: 8, border: "1px solid #bdbdbd", fontSize: 18 }}
            required
          />
          <input
            name="duration"
            type="number"
            placeholder="Kỳ hạn (tháng)"
            value={form.duration}
            onChange={handleChange}
            style={{ padding: 12, borderRadius: 8, border: "1px solid #bdbdbd", fontSize: 18 }}
            required
          />
          {Number(form.amount) >= 10000 && (
            <select
              name="rwaNft"
              value={form.rwaNft}
              onChange={handleChange}
              style={{ padding: 12, borderRadius: 8, border: "1px solid #bdbdbd", fontSize: 18 }}
              required
            >
              <option value="">Chọn RWA-NFT làm tài sản thế chấp</option>
              {mockRwaNfts.map(nft => (
                <option key={nft.id} value={nft.name}>{nft.name}</option>
              ))}
            </select>
          )}
          <button type="submit" style={{ padding: "12px 0", borderRadius: 8, background: "#1976d2", color: "#fff", fontWeight: 700, fontSize: 18, border: "none", cursor: "pointer" }}>
            Gửi yêu cầu vay
          </button>
        </form>
        <h2 style={{ color: "#34495e", fontWeight: 700, fontSize: 22, marginBottom: 12 }}>Trạng thái yêu cầu vay</h2>
        <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
          {Object.entries(STATUS_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setStatus(key)}
              style={{ padding: "6px 18px", borderRadius: 6, border: status === key ? "2px solid #1976d2" : "1px solid #bdbdbd", background: status === key ? "#e3f2fd" : "#fff", color: "#1976d2", fontWeight: 600, cursor: "pointer" }}
            >
              {label}
            </button>
          ))}
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {requests.filter(r => status === "open" || r.status === status).length === 0 && (
            <li style={{ color: "#bdbdbd", fontStyle: "italic" }}>Chưa có yêu cầu nào.</li>
          )}
          {requests.filter(r => status === "open" || r.status === status).map(r => (
            <li key={r.id} style={{ background: "#f5f7fa", borderRadius: 8, padding: 16, marginBottom: 12, border: "1px solid #e0e7ef" }}>
              <div><b>Số tiền:</b> {r.amount} USDC</div>
              <div><b>Lãi suất:</b> {r.interest}%</div>
              <div><b>Kỳ hạn:</b> {r.duration} tháng</div>
              {r.rwaNft && <div><b>RWA-NFT:</b> {r.rwaNft}</div>}
              <div><b>Trạng thái:</b> {STATUS_LABELS[r.status]}</div>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
}
