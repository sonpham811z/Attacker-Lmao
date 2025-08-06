import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Divider, Chip } from "@mui/material";
import { useWeb3 } from "../../contexts/Web3Context";
import { ethers } from "ethers";
import { validatorRegistryAddress, validatorRegistryABI } from "../../contracts/contract-info";
import GavelIcon from '@mui/icons-material/Gavel';
import AdminActions from "./AdminActions";

// Địa chỉ admin hợp lệ (có thể sửa thành nhiều địa chỉ nếu cần)
const ADMIN_ADDRESSES = [
  "0xCa38Bd92D9034B3f08d8fe3c32147dd9510306F1" // Thay bằng địa chỉ admin thực tế
];




const AdminPage = () => {
  const { account, isConnected, connectWallet } = useWeb3();
  const isAdmin = ADMIN_ADDRESSES.map(a => a.toLowerCase()).includes((account||"").toLowerCase());
  const [fraudReports, setFraudReports] = useState([]);
  const [stakeInfo, setStakeInfo] = useState({ loading: true, error: null, stakedAmount: '', isActive: false });

  // Hàm lấy thông tin stake của validator
  const fetchStakeInfo = async (validatorAddress) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(validatorRegistryAddress, validatorRegistryABI, provider);
      const info = await contract.validators(validatorAddress);
      setStakeInfo({
        loading: false,
        error: null,
        stakedAmount: info.stakedAmount ? info.stakedAmount.toString() : '0',
        isActive: info.isActive
      });
    } catch (e) {
      setStakeInfo({ loading: false, error: 'Không lấy được thông tin stake', stakedAmount: '', isActive: false });
    }
  };

  // Tự động lấy stake của validator đầu tiên trong danh sách gian lận (hoặc của admin)
  useEffect(() => {
    if (fraudReports.length > 0) {
      fetchStakeInfo(fraudReports[0].validator);
    } else if (account) {
      fetchStakeInfo(account);
    }
  }, [fraudReports, account]);

  // Lấy event logs từ contract (nếu contract có event FraudReported)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(validatorRegistryAddress, validatorRegistryABI, provider);
        const filter = contract.filters.FraudReported();
        const logs = await contract.queryFilter(filter, 0, "latest");
        // Lấy block timestamp cho từng log
        const blockTimes = {};
        await Promise.all(logs.map(async (log) => {
          if (!blockTimes[log.blockNumber]) {
            const block = await provider.getBlock(log.blockNumber);
            blockTimes[log.blockNumber] = block && block.timestamp ? new Date(block.timestamp * 1000) : null;
          }
        }));
        const reports = logs.map(log => ({
          id: log.args?.reportId?.toString() || log.logIndex,
          validator: log.args?.validator,
          // reporter: log.args?.reporter, // Bỏ người báo cáo nếu không cần
          evidence: log.args?.evidence,
          status: "Pending", // Nếu contract có status thì lấy thêm
          time: blockTimes[log.blockNumber],
        })).reverse();
        setFraudReports(reports);
      } catch (err) {
        setFraudReports([]);
      }
    };
    fetchEvents();
  }, []);

  if (!isConnected) {
    return (
      <Box p={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
        <Box sx={{
          background: 'linear-gradient(135deg, #20bf6b 0%, #1abc9c 100%)',
          borderRadius: 4,
          p: 4,
          boxShadow: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: 340
        }}>
          <GavelIcon sx={{ fontSize: 48, color: '#fff', mb: 2, background: '#1abc9c', borderRadius: '50%', p: 1.5, boxShadow: 2 }} />
          <Typography variant="h5" mb={2} sx={{ color: '#fff', fontWeight: 700, textShadow: '0 2px 8px #0002' }}>
            Vui lòng kết nối ví để truy cập trang admin
          </Typography>
          <button
            style={{
              padding: '12px 32px',
              fontWeight: 700,
              background: 'linear-gradient(90deg, #20bf6b 0%, #1abc9c 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontSize: 18,
              cursor: 'pointer',
              boxShadow: '0 2px 12px #1abc9c44',
              transition: 'background 0.2s, transform 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #1abc9c 0%, #20bf6b 100%)'}
            onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #20bf6b 0%, #1abc9c 100%)'}
            onClick={connectWallet}
          >
            <span style={{ fontSize: 22, marginRight: 10 }}>🔗</span> Kết nối ví
          </button>
        </Box>
      </Box>
    );
  }

  if (!isAdmin) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h5" color="error">Bạn không có quyền truy cập trang này.</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        <GavelIcon sx={{ mr: 1, color: 'error.main' }} /> Trang Admin - Theo dõi gian lận
      </Typography>
      <AdminActions reloadStake={() => {
        // Sau khi phạt thành công, refetch lại stake của validator đầu tiên hoặc admin
        if (fraudReports.length > 0) {
          fetchStakeInfo(fraudReports[0].validator);
        } else if (account) {
          fetchStakeInfo(account);
        }
      }} />
      
    </Box>
  );
};

export default AdminPage;
