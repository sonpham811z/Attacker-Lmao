// TransactionMonitor.jsx
import React, { useState, useEffect } from "react";
import TransactionHistoryTable from "../components/TransactionHistoryTable";
import { getWalletInfo } from "../utils/etherscanApi";
import TopBar from "../components/TopBar";
const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

// Màu cho light/dark mode
const LIGHT = {
  bg: "linear-gradient(135deg, #f5f3ff 0%, #e0e7ff 100%)",
  box: "rgba(255,255,255,0.85)",
  card: "#ffe0b2",
  text: "#1976d2",
  accent: "#ff9800",
  heading: "#1976d2",
  error: "#e74c3c",
};
const DARK = {
  bg: "linear-gradient(135deg, #23272f 0%, #10131a 100%)",
  box: "rgba(30,32,38,0.95)",
  card: "#23272f",
  text: "#90caf9",
  accent: "#ffb74d",
  heading: "#90caf9",
  error: "#ff5252",
};

export default function TransactionMonitor() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? DARK : LIGHT;
// Ethereum SVG icon
const ethIcon = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: "middle", marginRight: 10 }}>
    <circle cx="16" cy="16" r="16" fill="#f5f7fa" />
    <path d="M16 6L16.2 6.6V20.7L16 20.9L15.8 20.7V6.6L16 6Z" fill="#1976d2" />
    <path d="M16 21.3L16.2 21.1V25.4L16 25.6L15.8 25.4V21.1L16 21.3Z" fill="#4285f4" />
    <path d="M16 6L24 16.1L16 20.9L8 16.1L16 6Z" fill="#1976d2" />
    <path d="M16 21.3L24 17.1L16 25.6L8 17.1L16 21.3Z" fill="#4285f4" />
  </svg>
);

  const [input, setInput] = useState("");
  const [address, setAddress] = useState("");
  const [history, setHistory] = useState([
    "0xCa38Bd...0306F1",
    "0xBF6726...8D3Cb2"
  ]);
  const [showMore, setShowMore] = useState(false);
  const [walletInfo, setWalletInfo] = useState(null);
  const [walletLoading, setWalletLoading] = useState(false);
  const [walletError, setWalletError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setAddress(input.trim());
      // Lưu lịch sử, chỉ lưu nếu chưa có
      if (!history.includes(input.trim())) {
        setHistory([input.trim(), ...history].slice(0, 10));
      }
    }
  };

  const handleHistoryClick = (addr) => {
    setInput(addr);
    setAddress(addr);
  };

  const handleEtherscanClick = (addr) => {
    window.open(`https://sepolia.etherscan.io/address/${addr}`, "_blank");
  };

  useEffect(() => {
    if (!address) return;
    setWalletLoading(true); setWalletError(""); setWalletInfo(null);
    getWalletInfo(address, ETHERSCAN_API_KEY)
      .then(info => setWalletInfo(info))
      .catch(err => setWalletError(err.message))
      .finally(() => setWalletLoading(false));
  }, [address]);

  // Số lượng hiển thị ban đầu
  const DISPLAY_LIMIT = 3;
  const visibleHistory = showMore ? history : history.slice(0, DISPLAY_LIMIT);

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, padding: 0, width: "100vw", transition: "background 0.3s" }}>
      <TopBar pageTitle="Lịch sử giao dịch on-chain" />
      <div style={{ display: "flex", justifyContent: "center", width: "100%", minHeight: "calc(100vh - 64px)", alignItems: "center" }}>
        <div style={{
          width: 1100,
          padding: 32,
          background: theme.box,
          borderRadius: 24,
          boxShadow: darkMode ? "0 4px 32px #0008" : "0 4px 32px rgba(120, 86, 255, 0.08)",
          display: "flex",
          gap: 32,
          alignItems: "flex-start",
          transition: "background 0.3s"
        }}>
        {/* Left Section */}
        <div style={{ flex: 2 }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
            <button onClick={() => setDarkMode(m => !m)} style={{ background: theme.card, color: theme.text, border: "none", borderRadius: 8, padding: "6px 18px", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: darkMode ? "0 1px 4px #0006" : "0 1px 4px #ff980022", zIndex: 10 }}>
              {darkMode ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 28, color: theme.text }}>♦</span>
            
            <span style={{ fontSize: 0 }}></span>
          </div>
          <h1 style={{ color: theme.heading, fontWeight: 800, fontSize: 38, margin: 0, marginBottom: 12, letterSpacing: "-1px" }}>
            Tra cứu Lịch sử Giao dịch Ethereum
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <span style={{ color: theme.text, fontWeight: 600, fontSize: 18 }}>Lịch sử tra cứu:</span>
            {visibleHistory.map((addr, idx) => (
              <span key={idx} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <button
                  style={{ background: theme.card, color: theme.text, borderRadius: 6, padding: "2px 10px", fontWeight: 600, fontSize: 16, border: "none", cursor: "pointer", transition: "box-shadow 0.2s", boxShadow: darkMode ? "0 1px 4px #0006" : "0 1px 4px #ff980022" }}
                  onClick={() => handleHistoryClick(addr)}
                  title="Tra cứu lại địa chỉ này"
                >
                  {addr.length > 12 ? `${addr.slice(0, 6)}...${addr.slice(-6)}` : addr}
                </button>
                <button
                  style={{ background: "none", border: "none", color: theme.accent, cursor: "pointer", fontSize: 18, padding: 0 }}
                  onClick={() => handleEtherscanClick(addr)}
                  title="Xem trên Etherscan"
                >
                  ↗
                </button>
              </span>
            ))}
            {history.length > DISPLAY_LIMIT && !showMore && (
              <button
                style={{ background: theme.card, color: theme.text, borderRadius: 6, padding: "2px 10px", fontWeight: 600, fontSize: 16, border: "none", cursor: "pointer", marginLeft: 8 }}
                onClick={() => setShowMore(true)}
              >
                Xem tiếp
              </button>
            )}
            {showMore && history.length > DISPLAY_LIMIT && (
              <button
                style={{ background: theme.card, color: theme.text, borderRadius: 6, padding: "2px 10px", fontWeight: 600, fontSize: 16, border: "none", cursor: "pointer", marginLeft: 8 }}
                onClick={() => setShowMore(false)}
              >
                Thu gọn
              </button>
            )}
          </div>
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, marginBottom: 18 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Nhập địa chỉ ví Ethereum (0x...)"
              style={{ flex: 1, padding: "12px 16px", borderRadius: 8, border: `2px solid ${theme.accent}` , fontSize: 18, outline: "none", background: darkMode ? "#181a20" : "#fff", color: theme.text, transition: "background 0.3s" }}
            />
            <button type="submit" style={{ padding: "12px 32px", borderRadius: 8, background: theme.text, color: darkMode ? "#23272f" : "#fff", fontWeight: 700, fontSize: 18, border: "none", cursor: "pointer", boxShadow: darkMode ? "0 2px 8px #0006" : "0 2px 8px #ff980022", transition: "background 0.3s" }}>
              Xem lịch sử
            </button>
          </form>
          {address && (
            <div style={{ marginBottom: 18, background: theme.card, borderRadius: 12, padding: 18, boxShadow: darkMode ? "0 2px 8px #0006" : "0 2px 8px #ff980022" }}>
              <h3 style={{ color: theme.heading, fontWeight: 700, marginBottom: 8, fontSize: 22 }}>Thông tin ví Sepolia</h3>
              {walletLoading && <div style={{ color: theme.accent, fontWeight: 600 }}><span role="img" aria-label="loading">⏳</span> Đang tải thông tin ví...</div>}
              {walletError && <div style={{ color: theme.error, fontWeight: 600 }}><span role="img" aria-label="error">❌</span> {walletError}</div>}
              {walletInfo && (
                <div style={{ fontSize: 16, color: darkMode ? "#fff" : "#333", lineHeight: 1.7 }}>
                  <div><b>Số dư:</b> <span style={{ color: theme.heading, fontWeight: 700 }}>{walletInfo.balance}</span> ETH</div>
                  <div><b>Số giao dịch:</b> <span style={{ color: theme.heading, fontWeight: 700 }}>{walletInfo.txCount}</span></div>
                </div>
              )}
            </div>
          )}
          {address && (
            <div style={{ marginBottom: 18 }}>
              <TransactionHistoryTable address={address} enableExport enablePagination />
            </div>
          )}
        </div>
        {/* Right Section - Guide */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <div style={{ background: theme.card, borderRadius: "50%", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="24" fill={theme.card}/><path d="M24 12L34 24L24 36L14 24L24 12Z" fill={theme.text}/></svg>
          </div>
          <div style={{ background: darkMode ? "#23272f" : "#fff", borderRadius: 16, boxShadow: darkMode ? "0 2px 12px #0006" : "0 2px 12px #ff980022", padding: "18px 22px", textAlign: "center" }}>
            <div style={{ color: theme.heading, fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
              <span role="img" aria-label="bulb">💡</span> Hướng dẫn
            </div>
            <div style={{ color: theme.accent, fontSize: 16, fontWeight: 500 }}>
              Nhập địa chỉ ví Ethereum (bắt đầu bằng 0x) để tra cứu lịch sử giao dịch on-chain.<br />
              Bấm vào link để xem chi tiết trên Etherscan Sepolia.
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}