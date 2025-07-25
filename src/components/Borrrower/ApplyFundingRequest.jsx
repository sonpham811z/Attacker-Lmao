import React, { useState } from "react";

const LOAN_COLLATERAL_THRESHOLD = 1000;

const ApplyFundingRequest = ({ rwaNfts = [], onNewRequest }) => {
  const [amount, setAmount] = useState(0);
  const [interest, setInterest] = useState(0);
  const [term, setTerm] = useState(0);
  const [collateralId, setCollateralId] = useState("");
  const [status, setStatus] = useState("Mở");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!amount || !interest || !term) {
      setError("Vui lòng nhập đầy đủ thông tin khoản vay.");
      return;
    }
    if (amount > LOAN_COLLATERAL_THRESHOLD && !collateralId) {
      setError("Khoản vay lớn cần chọn RWA-NFT làm tài sản thế chấp.");
      return;
    }
    const newRequest = {
      amount,
      interest,
      term,
      collateral: amount > LOAN_COLLATERAL_THRESHOLD ? collateralId : null,
      status: "Đang chờ",
      createdAt: new Date().toISOString(),
    };
    if (onNewRequest) onNewRequest(newRequest);
    setAmount(0);
    setInterest(0);
    setTerm(0);
    setCollateralId("");
    setStatus("Mở");
  }

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: 24, background: "#f5f7fa", borderRadius: 12 }}>
      <h2 style={{ color: "#1976d2", fontWeight: 700 }}>Tạo yêu cầu vay</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <label>
          Số tiền vay (USDT):
          <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} min={1} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #1976d2" }} />
        </label>
        <label>
          Lãi suất (%/năm):
          <input type="number" value={interest} onChange={e => setInterest(Number(e.target.value))} min={0.1} step={0.1} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #1976d2" }} />
        </label>
        <label>
          Kỳ hạn (tháng):
          <input type="number" value={term} onChange={e => setTerm(Number(e.target.value))} min={1} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #1976d2" }} />
        </label>
        {amount > LOAN_COLLATERAL_THRESHOLD && (
          <label>
            Chọn RWA-NFT làm tài sản thế chấp:
            <select value={collateralId} onChange={e => setCollateralId(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #1976d2" }}>
              <option value="">-- Chọn NFT --</option>
              {rwaNfts.map(nft => (
                <option key={nft.id} value={nft.id}>{nft.name}</option>
              ))}
            </select>
          </label>
        )}
        <button type="submit" style={{ padding: "10px 0", borderRadius: 8, background: "#1976d2", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>Gửi yêu cầu</button>
        {error && <div style={{ color: "#e74c3c", fontWeight: 600 }}>{error}</div>}
      </form>
    </div>
  );
};

export default ApplyFundingRequest;
