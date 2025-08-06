import React, { useState } from "react";
import TopBar from "../components/TopBar";

const MOCK_REQUESTS = [
  {
    id: 1,
    borrower: "Sơn Phạm",
    creditScore: 780,
    collateral: "RWA-NFT #1",
    interest: 7.5,
    duration: 12,
    report: "Đã xác thực bởi CertiK",
    txHistory: ["0xCa38Bd...0306F1", "0xBF6726...8D3Cb2"],
    status: "pending"
  },
  {
    id: 2,
    borrower: "Văn Đô",
    creditScore: 650,
    collateral: "Không",
    interest: 10,
    duration: 6,
    report: "Chưa xác thực",
    txHistory: ["0xA1B2C3...D4E5F6"],
    status: "pending"
  },
  {
    id: 3,
    borrower: "An Nguyễn",
    creditScore: 820,
    collateral: "RWA-NFT #2",
    interest: 6,
    duration: 24,
    report: "Đã xác thực bởi Chainlink",
    txHistory: ["0x123456...7890AB"],
    status: "pending"
  },
  {
    id: 4,
    borrower: "Hải Đặng",
    creditScore: 700,
    collateral: "RWA-NFT #3",
    interest: 8.2,
    duration: 18,
    report: "Đã xác thực bởi CertiK",
    txHistory: ["0xF1E2D3...C4B5A6"],
    status: "pending"
  },
  {
    id: 5,
    borrower: "Minh Châu",
    creditScore: 600,
    collateral: "Không",
    interest: 12,
    duration: 9,
    report: "Chưa xác thực",
    txHistory: ["0xB2C3D4...E5F6A7"],
    status: "pending"
  },
  {
    id: 6,
    borrower: "Quốc Anh",
    creditScore: 750,
    collateral: "RWA-NFT #4",
    interest: 7,
    duration: 15,
    report: "Đã xác thực bởi Chainlink",
    txHistory: ["0xC1D2E3...F4A5B6"],
    status: "pending"
  },
  {
    id: 7,
    borrower: "Bảo Trâm",
    creditScore: 810,
    collateral: "RWA-NFT #5",
    interest: 5.5,
    duration: 36,
    report: "Đã xác thực bởi CertiK",
    txHistory: ["0xD1E2F3...A4B5C6"],
    status: "pending"
  },
  {
    id: 8,
    borrower: "Khánh Linh",
    creditScore: 670,
    collateral: "Không",
    interest: 11,
    duration: 8,
    report: "Chưa xác thực",
    txHistory: ["0xE1F2A3...B4C5D6"],
    status: "pending"
  },
  {
    id: 9,
    borrower: "Hữu Phước",
    creditScore: 720,
    collateral: "RWA-NFT #6",
    interest: 8.8,
    duration: 20,
    report: "Đã xác thực bởi CertiK",
    txHistory: ["0xF2A3B4...C5D6E7"],
    status: "pending"
  },
  {
    id: 10,
    borrower: "Thu Hằng",
    creditScore: 690,
    collateral: "Không",
    interest: 10.5,
    duration: 10,
    report: "Chưa xác thực",
    txHistory: ["0xA3B4C5...D6E7F8"],
    status: "pending"
  },
  {
    id: 11,
    borrower: "Trọng Nghĩa",
    creditScore: 800,
    collateral: "RWA-NFT #7",
    interest: 6.2,
    duration: 30,
    report: "Đã xác thực bởi Chainlink",
    txHistory: ["0xB4C5D6...E7F8A9"],
    status: "pending"
  },
  {
    id: 12,
    borrower: "Kim Ngân",
    creditScore: 730,
    collateral: "RWA-NFT #8",
    interest: 7.9,
    duration: 16,
    report: "Đã xác thực bởi CertiK",
    txHistory: ["0xC5D6E7...F8A9B0"],
    status: "pending"
  },
  {
    id: 13,
    borrower: "Phúc Lâm",
    creditScore: 610,
    collateral: "Không",
    interest: 13,
    duration: 7,
    report: "Chưa xác thực",
    txHistory: ["0xD6E7F8...A9B0C1"],
    status: "pending"
  },
  {
    id: 14,
    borrower: "Thanh Tùng",
    creditScore: 765,
    collateral: "RWA-NFT #9",
    interest: 7.1,
    duration: 22,
    report: "Đã xác thực bởi Chainlink",
    txHistory: ["0xE7F8A9...B0C1D2"],
    status: "pending"
  },
  {
    id: 15,
    borrower: "Ngọc Diệp",
    creditScore: 680,
    collateral: "Không",
    interest: 12.5,
    duration: 11,
    report: "Chưa xác thực",
    txHistory: ["0xF8A9B0...C1D2E3"],
    status: "pending"
  }
];

export default function LoanRequests() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [filters, setFilters] = useState({ creditScore: "", collateral: "", interest: "", duration: "" });
  const [selected, setSelected] = useState(null);
  const [decision, setDecision] = useState("");

  function handleFilterChange(e) {
    setFilters(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function filteredRequests() {
    return requests.filter(r =>
      (!filters.creditScore || r.creditScore >= Number(filters.creditScore)) &&
      (!filters.collateral || (filters.collateral === "Có" ? r.collateral !== "Không" : r.collateral === "Không")) &&
      (!filters.interest || r.interest <= Number(filters.interest)) &&
      (!filters.duration || r.duration <= Number(filters.duration))
    );
  }

  function handleDecision(decision) {
    setRequests(reqs => reqs.map(r => r.id === selected.id ? { ...r, status: decision === "accept" ? "funded" : "rejected" } : r));
    setSelected(null);
    setDecision("");
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f3ff 0%, #e0e7ff 100%)", width: "100vw" }}>
      <TopBar />
      <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
        {/* Sidebar */}
        <div style={{ width: 320, background: "#fff", borderRight: "1px solid #e0e7ef", padding: 24, boxShadow: "2px 0 12px #1976d211", height: "100%", overflowY: "auto" }}>
          <h2 style={{ color: "#1976d2", fontWeight: 800, fontSize: 24, marginBottom: 18 }}>Bộ lọc</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input name="creditScore" type="number" placeholder="Điểm tín dụng tối thiểu" value={filters.creditScore} onChange={handleFilterChange} style={{ padding: 10, borderRadius: 8, border: "1px solid #bdbdbd", fontSize: 16 }} />
            <select name="collateral" value={filters.collateral} onChange={handleFilterChange} style={{ padding: 10, borderRadius: 8, border: "1px solid #bdbdbd", fontSize: 16 }}>
              <option value="">Tài sản thế chấp</option>
              <option value="Có">Có</option>
              <option value="Không">Không</option>
            </select>
            <input name="interest" type="number" placeholder="Lãi suất tối đa (%)" value={filters.interest} onChange={handleFilterChange} style={{ padding: 10, borderRadius: 8, border: "1px solid #bdbdbd", fontSize: 16 }} />
            <input name="duration" type="number" placeholder="Kỳ hạn tối đa (tháng)" value={filters.duration} onChange={handleFilterChange} style={{ padding: 10, borderRadius: 8, border: "1px solid #bdbdbd", fontSize: 16 }} />
          </div>
          <hr style={{ margin: "24px 0" }} />
          <h2 style={{ color: "#1976d2", fontWeight: 800, fontSize: 22, marginBottom: 12 }}>Yêu cầu vay</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, maxHeight: 400, overflowY: "auto" }}>
            {filteredRequests().map(r => (
              <li key={r.id} style={{ background: "#f5f7fa", borderRadius: 8, padding: 14, marginBottom: 10, border: "1px solid #e0e7ef", cursor: "pointer", fontWeight: 600, color: "#1976d2" }} onClick={() => setSelected(r)}>
                {r.borrower} <span style={{ color: "#34495e", fontWeight: 400, fontSize: 15 }}>| {r.amount || "?"} USDC</span>
              </li>
            ))}
            {filteredRequests().length === 0 && <li style={{ color: "#bdbdbd", fontStyle: "italic" }}>Không có yêu cầu phù hợp.</li>}
          </ul>
        </div>
        {/* Main Content */}
        <div style={{ flex: 1, padding: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {!selected ? (
            <div style={{ color: "#bdbdbd", fontSize: 22, fontWeight: 600 }}>Chọn một yêu cầu vay để xem chi tiết</div>
          ) : (
            <div style={{
              position: "relative",
              background: "rgba(255,255,255,0.95)",
              borderRadius: 24,
              boxShadow: "0 8px 32px #1976d244, 0 2px 16px #1976d222",
              padding: 40,
              minWidth: 420,
              maxWidth: 540,
              border: "2px solid #1976d2",
              overflow: "hidden"
            }}>
              {/* Gradient background effect */}
              <div style={{
                position: "absolute",
                inset: -30,
                zIndex: 0,
                background: "radial-gradient(circle at 80% 20%, #e3f2fd88 0%, #fff0 70%), radial-gradient(circle at 20% 80%, #bbdefb66 0%, #fff0 70%)",
                filter: "blur(12px)",
                pointerEvents: "none"
              }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 18 }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#1976d2 60%,#90caf9 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px #1976d233" }}>
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none"><circle cx="19" cy="19" r="19" fill="#fff"/><path d="M19 10a6 6 0 1 1 0 12a6 6 0 0 1 0-12Zm0 14c4.42 0 8 2.24 8 5v1H11v-1c0-2.76 3.58-5 8-5Z" fill="#1976d2"/></svg>
                  </div>
                  <div>
                    <h2 style={{ color: "#1976d2", fontWeight: 900, fontSize: 28, margin: 0, letterSpacing: "-1px" }}>Chi tiết hồ sơ borrower</h2>
                    <div style={{ color: "#90caf9", fontWeight: 600, fontSize: 16 }}>{selected.borrower}</div>
                  </div>
                </div>
                <div style={{ marginBottom: 18, display: "grid", rowGap: 12, columnGap: 24, gridTemplateColumns: "1fr 1fr" }}>
                  <div style={{ fontWeight: 700, color: "#1976d2" }}><span style={{ fontSize: 18 }}>★</span> Điểm tín dụng: <span style={{ color: selected.creditScore >= 800 ? '#43a047' : selected.creditScore >= 700 ? '#fbc02d' : '#e74c3c', fontWeight: 900 }}>{selected.creditScore}</span></div>
                  <div><b>RWA-NFT:</b> <span style={{ color: selected.collateral !== 'Không' ? '#1976d2' : '#bdbdbd', fontWeight: 700 }}>{selected.collateral}</span></div>
                  <div><b>Báo cáo xác thực:</b> <span style={{ color: selected.report.includes('Chưa') ? '#e74c3c' : '#1976d2', fontWeight: 600 }}>{selected.report}</span></div>
                  <div><b>Lịch sử giao dịch:</b> <span style={{ color: '#34495e', fontWeight: 500 }}>{selected.txHistory.map(tx => <span key={tx} style={{ marginRight: 8 }}>{tx}</span>)}</span></div>
                  <div><b>Lãi suất:</b> <span style={{ color: '#1976d2', fontWeight: 700 }}>{selected.interest}%</span></div>
                  <div><b>Kỳ hạn:</b> <span style={{ color: '#1976d2', fontWeight: 700 }}>{selected.duration} tháng</span></div>
                </div>
                <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
                  <button onClick={() => { setDecision("accept"); setTimeout(() => handleDecision("accept"), 800); }} style={{ padding: "14px 0", borderRadius: 10, background: "linear-gradient(90deg,#1976d2 60%,#64b5f6 100%)", color: "#fff", fontWeight: 800, fontSize: 18, border: "none", cursor: "pointer", flex: 1, boxShadow: "0 2px 8px #1976d233" }}>Cho vay</button>
                  <button onClick={() => { setDecision("reject"); setTimeout(() => handleDecision("reject"), 800); }} style={{ padding: "14px 0", borderRadius: 10, background: "#fff", color: "#e74c3c", fontWeight: 800, fontSize: 18, border: "2px solid #e74c3c", cursor: "pointer", flex: 1, boxShadow: "0 2px 8px #e74c3c22" }}>Từ chối</button>
                </div>
                {decision === "accept" && <div style={{ color: "#1976d2", fontWeight: 700, marginTop: 20, fontSize: 18 }}>Đang ký hợp đồng & chuyển USDC...</div>}
                {decision === "reject" && <div style={{ color: "#e74c3c", fontWeight: 700, marginTop: 20, fontSize: 18 }}>Đã gửi phản hồi từ chối.</div>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
