import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
// Icons
import GavelIcon from '@mui/icons-material/Gavel';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BlockIcon from '@mui/icons-material/Block';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import SettingsIcon from '@mui/icons-material/Settings';
import { useWeb3 } from '../../contexts/Web3Context';
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// ErrorBoundary component to catch React errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, m: 4, border: '2px solid #e74c3c', borderRadius: 2, background: '#fff6f6' }}>
          <Typography variant="h5" color="error" fontWeight={700} gutterBottom>
            Đã xảy ra lỗi trong trang quản trị!
          </Typography>
          <Typography color="error" sx={{ mb: 2 }}>{this.state.error && this.state.error.toString()}</Typography>
          <Typography variant="body2" color="text.secondary">
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </Typography>
        </Box>
      );
    }
    return this.props.children;
  }
}

const AdminActions = () => {
  // Web3 context
  const { account, contract } = useWeb3();

  // State for stake and validator info
  const [stake, setStake] = useState("");
  const [validatorInfo, setValidatorInfo] = useState({ loading: true, error: null, isActive: false, stakedAmount: '', slashedCount: 0 });

  // State for admin actions
  const [slashAddress, setSlashAddress] = useState("");
  const [slashPercent, setSlashPercent] = useState("");
  const [slashStatus, setSlashStatus] = useState("");
  const [deactivateAddress, setDeactivateAddress] = useState("");
  const [deactivateStatus, setDeactivateStatus] = useState("");
  const [fraudId, setFraudId] = useState("");
  const [fraudDecision, setFraudDecision] = useState("");
  const [fraudStatus, setFraudStatus] = useState("");
  const [trustedReporter, setTrustedReporter] = useState("");
  const [trustedStatus, setTrustedStatus] = useState("");
  const [removeReporter, setRemoveReporter] = useState("");
  const [removeStatus, setRemoveStatus] = useState("");
  const [mispricingThreshold, setMispricingThreshold] = useState("");
  const [mispricingSlashPercent, setMispricingSlashPercent] = useState("");
  const [mispricingStatus, setMispricingStatus] = useState("");

  // State for mispricing reports
  const [loadingMispricing, setLoadingMispricing] = useState(false);
  const [errorMispricing, setErrorMispricing] = useState(null);
  const [mispricingReports, setMispricingReports] = useState([]);
// State for fraud reports
const [loadingFraud, setLoadingFraud] = useState(false);
const [errorFraud, setErrorFraud] = useState(null);
const [fraudReports, setFraudReports] = useState([]);
  // State for detail dialog
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [blockTimestamp, setBlockTimestamp] = useState(null);
  // State for resolved status và tổng số báo cáo
  const [reportResolved, setReportResolved] = useState(false);
  const [mispricingCount, setMispricingCount] = useState(null);
  const [firstReport, setFirstReport] = useState(null);
  // Thời gian thực tế hiện tại (UTC) - fallback nếu không lấy được block timestamp
  const contractDeployTime = new Date();

  // Fetch stake and validator info
  useEffect(() => {
    const fetchInfo = async () => {
      if (!contract || !account) return;
      setValidatorInfo(v => ({ ...v, loading: true, error: null }));
      try {
        const info = await contract.validators(account);
        setStake(info.stakedAmount ? info.stakedAmount.toString() : "0");
        setValidatorInfo({
          loading: false,
          error: null,
          isActive: info.isActive,
          stakedAmount: info.stakedAmount ? info.stakedAmount.toString() : "0",
          slashedCount: info.slashedCount ? Number(info.slashedCount) : 0
        });
      } catch (e) {
        setValidatorInfo({ loading: false, error: "Không lấy được thông tin validator", isActive: false, stakedAmount: '', slashedCount: 0 });
      }
    };
    fetchInfo();
  }, [contract, account]);

  // Fetch mispricing reports from contract events
  useEffect(() => {
    const fetchMispricingReports = async () => {
      if (!contract) return;
      setLoadingMispricing(true);
      setErrorMispricing(null);
      try {
        // Lấy filter cho event ValidatorMispriced
        const filter = contract.filters.ValidatorMispriced();
        const logs = await contract.queryFilter(filter, 0, "latest");
        // Nhóm báo cáo theo validator
        const grouped = {};
        logs.forEach((log, idx) => {
          const validator = log.args?.validator || '';
          if (!grouped[validator]) grouped[validator] = [];
          grouped[validator].push({
            id: log.args?.reportId !== undefined && log.args?.reportId !== ''
              ? log.args.reportId.toString()
              : grouped[validator].length.toString(),
            validator,
            reporter: log.args?.reporter || '',
            expectedValue: log.args?.expectedValue?.toString() || '',
            actualValue: log.args?.actualValue?.toString() || '',
            blockNumber: log.blockNumber,
            transactionHash: log.transactionHash,
          });
        });
        // Tạo mảng báo cáo, mỗi báo cáo có thêm index trong mảng của validator (bắt đầu từ 0 cho từng validator)
        const reports = [];
        Object.entries(grouped).forEach(([validator, arr]) => {
          arr.forEach((r, idx) => {
            reports.push({ ...r, validator, reportIndex: idx });
          });
        });
        // Đảo ngược để mới nhất lên đầu
        setMispricingReports(reports.reverse());
      } catch (err) {
        setErrorMispricing('Không lấy được danh sách báo cáo mispricing');
        setMispricingReports([]);
      }
      setLoadingMispricing(false);
    };
    fetchMispricingReports();
  }, [contract]);

// Fetch fraud reports from contract events (always fetch all logs to restore full data)
useEffect(() => {
    const fetchFraudReports = async () => {
        if (!contract) return;
        setLoadingFraud(true);
        setErrorFraud(null);
        try {
            // Lấy toàn bộ event FraudReported từ block 0 đến latest
            const filter = contract.filters.FraudReported();
            const logs = await contract.queryFilter(filter, 0, "latest");
            // Nhóm báo cáo theo validator
            const grouped = {};
            logs.forEach((log, idx) => {
                const validator = log.args?.validator || '';
                if (!grouped[validator]) grouped[validator] = [];
                grouped[validator].push({
                    id: log.args?.reportId !== undefined && log.args?.reportId !== ''
                        ? log.args.reportId.toString()
                        : idx.toString(), // dùng idx toàn cục nếu không có reportId
                    validator,
                    reporter: log.args?.reporter || '',
                    evidence: log.args?.evidence || '',
                    blockNumber: log.blockNumber,
                    transactionHash: log.transactionHash,
                });
            });
            // Tạo mảng báo cáo, mỗi báo cáo có thêm index trong mảng của validator
            const reports = [];
            Object.entries(grouped).forEach(([validator, arr]) => {
                arr.forEach((r, idx) => {
                    reports.push({ ...r, validator, reportIndex: idx });
                });
            });
            setFraudReports(reports.reverse());
        } catch (err) {
            setErrorFraud('Không lấy được danh sách báo cáo gian lận');
            setFraudReports([]);
        }
        setLoadingFraud(false);
    };
    fetchFraudReports();
}, [contract]);

  // Fetch block timestamp, resolved status, tổng số báo cáo và báo cáo đầu tiên khi mở dialog
  useEffect(() => {
    const fetchBlockTimeAndResolved = async () => {
      if (!selectedReport || !contract) {
        setBlockTimestamp(null);
        setReportResolved(false);
        setMispricingCount(null);
        setFirstReport(null);
        return;
      }
      try {
        // Block timestamp
        const provider = contract.runner || contract.provider;
        if (!provider) setBlockTimestamp(null);
        else {
          const block = await provider.getBlock(selectedReport.blockNumber);
          if (block && block.timestamp) setBlockTimestamp(new Date(block.timestamp * 1000));
          else setBlockTimestamp(null);
        }
      } catch {
        setBlockTimestamp(null);
      }
      // Check resolved status from contract
      try {
        const resolved = await contract.mispricingReports(selectedReport.validator, selectedReport.reportIndex).then(r => r.resolved);
        setReportResolved(resolved);
      } catch {
        setReportResolved(false);
      }
      // Lấy tổng số báo cáo mispricing của validator này
      try {
        // Nếu contract có hàm getMispricingReportCount, dùng:
        // const count = await contract.getMispricingReportCount(selectedReport.validator);
        // Nếu không, thử truy cập length property (nếu contract public array)
        let count = null;
        if (contract.mispricingReports && contract.mispricingReports[selectedReport.validator]) {
          count = await contract.mispricingReports[selectedReport.validator].length;
        } else if (contract.getMispricingReportCount) {
          count = await contract.getMispricingReportCount(selectedReport.validator);
        } else {
          // fallback: thử truy cập như mapping(address => array)
          try {
            let i = 0;
            while (true) {
              await contract.mispricingReports(selectedReport.validator, i);
              i++;
            }
          } catch {
            count = i;
          }
        }
        setMispricingCount(count);
      } catch {
        setMispricingCount(null);
      }
      // Lấy báo cáo đầu tiên (index = 0)
      try {
        const first = await contract.mispricingReports(selectedReport.validator, 0);
        setFirstReport(first);
      } catch {
        setFirstReport(null);
      }
    };
    if (openDetail && selectedReport) fetchBlockTimeAndResolved();
    else {
      setBlockTimestamp(null);
      setReportResolved(false);
      setMispricingCount(null);
      setFirstReport(null);
    }
  }, [openDetail, selectedReport, contract]);

  // Dummy handlers for admin actions (replace with contract calls)
  const handleSlash = async (e) => {
    e.preventDefault();
    setSlashStatus('Đang gửi giao dịch...');
    if (!contract || !slashAddress || !slashPercent) {
      setSlashStatus('Thiếu thông tin hoặc chưa kết nối contract');
      return;
    }
    try {
      // Gọi hàm slashValidator trên contract
      console.log('slashAddress:', slashAddress, 'slashPercent:', slashPercent);
      const tx = await contract.slashValidator(slashAddress, slashPercent);
      setSlashStatus('Đang chờ xác nhận...');
      await tx.wait();
      setSlashStatus('Phạt thành công!');
      // Cập nhật lại thông tin validator nếu cần
      try {
        const info = await contract.validators(slashAddress);
        setValidatorInfo(v => ({
          ...v,
          isActive: info.isActive,
          stakedAmount: info.stakedAmount ? info.stakedAmount.toString() : "0",
          slashedCount: info.slashedCount ? Number(info.slashedCount) : 0,
          error: null,
          loading: false
        }));
      } catch (e) {
        // Không cập nhật được thông tin validator
      }
    } catch (err) {
      let errorMsg = 'Phạt thất bại: ';
      if (err?.error?.data?.message) {
        errorMsg += err.error.data.message;
      } else if (err?.data?.message) {
        errorMsg += err.data.message;
      } else if (err?.reason) {
        errorMsg += err.reason;
      } else if (err?.message) {
        errorMsg += err.message;
      } else if (err?.stack) {
        errorMsg += err.stack;
      } else {
        errorMsg += 'Không rõ nguyên nhân.';
      }
      setSlashStatus(errorMsg);
    }
  };
  const handleDeactivate = e => {
    e.preventDefault();
    setDeactivateStatus('Đang gửi giao dịch...');
    const deactivate = async () => {
      if (!contract || !deactivateAddress) {
        setDeactivateStatus('Thiếu thông tin hoặc chưa kết nối contract');
        return;
      }
      try {
        // Gọi hàm forceDeactivateValidator trên contract
        const tx = await contract.forceDeactivateValidator(deactivateAddress);
        setDeactivateStatus('Đang chờ xác nhận...');
        await tx.wait();
        setDeactivateStatus('Vô hiệu hóa thành công!');
        // Cập nhật lại trạng thái validator
        try {
          const info = await contract.validators(deactivateAddress);
          setValidatorInfo(v => ({
            ...v,
            isActive: false,
            stakedAmount: info.stakedAmount ? info.stakedAmount.toString() : "0",
            slashedCount: info.slashedCount ? Number(info.slashedCount) : 0,
            error: null,
            loading: false
          }));
        } catch (e) {
          setValidatorInfo(v => ({ ...v, isActive: false, error: "Không lấy được thông tin validator", loading: false }));
        }
      } catch (err) {
        setDeactivateStatus('Vô hiệu hóa thất bại: ' + (err?.reason || err?.message || ''));
      }
    };
    deactivate();
  };
  const handleResolveFraud = e => {
    e.preventDefault();
    setFraudStatus('Đang gửi giao dịch...');
    const resolve = async () => {
      if (!contract || !selectedReport || !fraudDecision) {
        setFraudStatus('Thiếu thông tin hoặc chưa kết nối contract');
        return;
      }
      // Lấy validator và index từ selectedReport (luôn dùng reportIndex để đảm bảo đúng vị trí và liên tục)
      const validatorAddress = selectedReport.validator;
      const reportIndex = selectedReport.reportIndex !== undefined ? selectedReport.reportIndex : 0;
      const decisionValue = fraudDecision === 'true';
      try {
        const tx = await contract.resolveFraudReport(validatorAddress, reportIndex, decisionValue);
        setFraudStatus('Đang chờ xác nhận...');
        await tx.wait();
        setFraudStatus('Xử lý thành công!');
      } catch (err) {
        setFraudStatus('Xử lý thất bại: ' + (err?.reason || err?.message || ''));
      }
    };
    resolve();
  };
  const handleAddTrusted = async (e) => {
    e.preventDefault();
    setTrustedStatus('Đang gửi giao dịch...');
    if (!contract || !trustedReporter) {
      setTrustedStatus('Thiếu thông tin hoặc chưa kết nối contract');
      return;
    }
    try {
      const tx = await contract.addTrustedReporter(trustedReporter);
      setTrustedStatus('Đang chờ xác nhận...');
      await tx.wait();
      setTrustedStatus('Thêm thành công!');
    } catch (err) {
      let errorMsg = 'Thêm thất bại: ';
      if (err?.error?.data?.message) {
        errorMsg += err.error.data.message;
      } else if (err?.data?.message) {
        errorMsg += err.data.message;
      } else if (err?.reason) {
        errorMsg += err.reason;
      } else if (err?.message) {
        errorMsg += err.message;
      } else if (err?.stack) {
        errorMsg += err.stack;
      } else {
        errorMsg += 'Không rõ nguyên nhân.';
      }
      setTrustedStatus(errorMsg);
    }
  };
  const handleRemoveTrusted = async (e) => {
    e.preventDefault();
    setRemoveStatus('Đang gửi giao dịch...');
    if (!contract || !removeReporter) {
      setRemoveStatus('Thiếu thông tin hoặc chưa kết nối contract');
      return;
    }
    try {
      const tx = await contract.removeTrustedReporter(removeReporter);
      setRemoveStatus('Đang chờ xác nhận...');
      await tx.wait();
      setRemoveStatus('Xóa thành công!');
    } catch (err) {
      let errorMsg = 'Xóa thất bại: ';
      if (err?.error?.data?.message) {
        errorMsg += err.error.data.message;
      } else if (err?.data?.message) {
        errorMsg += err.data.message;
      } else if (err?.reason) {
        errorMsg += err.reason;
      } else if (err?.message) {
        errorMsg += err.message;
      } else if (err?.stack) {
        errorMsg += err.stack;
      } else {
        errorMsg += 'Không rõ nguyên nhân.';
      }
      setRemoveStatus(errorMsg);
    }
  };
  const handleSetMispricing = async (e) => {
    e.preventDefault();
    setMispricingStatus('Đang gửi giao dịch...');
    if (!contract || !mispricingThreshold || !mispricingSlashPercent) {
      setMispricingStatus('Thiếu thông tin hoặc chưa kết nối contract');
      return;
    }
    try {
      const tx = await contract.setMispricingParameters(mispricingThreshold, mispricingSlashPercent);
      setMispricingStatus('Đang chờ xác nhận...');
      await tx.wait();
      setMispricingStatus('Cập nhật ngưỡng phạt giá thành công!');
    } catch (err) {
      let errorMsg = 'Cập nhật thất bại: ';
      if (err?.error?.data?.message) {
        errorMsg += err.error.data.message;
      } else if (err?.data?.message) {
        errorMsg += err.data.message;
      } else if (err?.reason) {
        errorMsg += err.reason;
      } else if (err?.message) {
        errorMsg += err.message;
      } else if (err?.stack) {
        errorMsg += err.stack;
      } else {
        errorMsg += 'Không rõ nguyên nhân.';
      }
      setMispricingStatus(errorMsg);
    }
  };
  // Xác nhận xử lý mispricing (admin xác nhận)
  const handleResolveMispricing = async (validator) => {
  setMispricingStatus('Đang gửi giao dịch...');
  if (!contract || !selectedReport) {
    setMispricingStatus('Thiếu thông tin hoặc chưa kết nối contract');
    return;
  }
  const validatorAddress = selectedReport.validator;
  const reportIndex = selectedReport.reportIndex;
  // Đếm số lượng báo cáo mispricing của validator này từ frontend (mispricingReports)
  const count = mispricingReports.filter(r => r.validator === validatorAddress).length;
  // Debug: In ra reportIndex và count trước khi kiểm tra
  console.log('[DEBUG] reportIndex:', reportIndex, 'count:', count);
  if (reportIndex === undefined || reportIndex < 0 || reportIndex >= count) {
    setMispricingStatus(`Báo cáo này không tồn tại trên contract! (reportIndex=${reportIndex}, count=${count})`);
    return;
  }
  // Kiểm tra trạng thái resolved trên contract
let resolved = false;
try {
  const report = await contract.mispricingReports(validatorAddress, reportIndex);
  resolved = report.resolved;
  if (resolved) {
    setMispricingStatus('Báo cáo này đã được xử lý trước đó!');
    return;
  }
} catch (e) {
  console.error('[ERROR] Không lấy được trạng thái resolved:', e, {validatorAddress, reportIndex});
  setMispricingStatus('Không lấy được trạng thái resolved của báo cáo!\n' + (e?.reason || e?.message || e?.toString?.() || ''));
  return;
}
  // Log chi tiết trước khi gọi contract
  console.log('[DEBUG] Gọi resolveMispricingReport với:', { validatorAddress, reportIndex, count, resolved, selectedReport });
  try {
    const tx = await contract.resolveMispricingReport(validatorAddress, reportIndex, true);
    setMispricingStatus('Đang chờ xác nhận...');
    await tx.wait();
    setMispricingStatus('Phạt mispricing thành công!');
    // Cập nhật lại thông tin validator
    try {
      const info = await contract.validators(validatorAddress);
      setStake(info.stakedAmount ? info.stakedAmount.toString() : "0");
      setValidatorInfo({
        loading: false,
        error: null,
        isActive: info.isActive,
        stakedAmount: info.stakedAmount ? info.stakedAmount.toString() : "0",
        slashedCount: info.slashedCount ? Number(info.slashedCount) : 0
      });
    } catch (e) {
      setValidatorInfo({ loading: false, error: "Không lấy được thông tin validator", isActive: false, stakedAmount: '', slashedCount: 0 });
    }
  } catch (err) {
    // Log lỗi chi tiết ra console để debug
    console.error('[ERROR] Lỗi khi gọi resolveMispricingReport:', err);
    let errorMsg = 'Phạt thất bại!\n';
    errorMsg += `validator: ${validatorAddress}\nreportIndex: ${reportIndex}\n`;
    errorMsg += `count: ${count}\nresolved: ${resolved}\n`;
    if (err?.error?.data?.message) {
      errorMsg += err.error.data.message;
    } else if (err?.data?.message) {
      errorMsg += err.data.message;
    } else if (err?.reason) {
      errorMsg += err.reason;
    } else if (err?.message) {
      errorMsg += err.message;
    } else if (err?.stack) {
      errorMsg += err.stack;
    } else {
      errorMsg += 'Không rõ nguyên nhân.';
    }
    if (err?.transaction) {
      errorMsg += '\nTransaction: ' + JSON.stringify(err.transaction, null, 2);
    }
    setMispricingStatus(errorMsg);
  }
};
  return (
    <ErrorBoundary>
      <>
        <Box sx={{ maxWidth: 1100, mx: 'auto', px: 2 }}>
          {/* TopBar */}
          <AppBar position="static" color="inherit" elevation={2} sx={{ mb: 4, borderRadius: 3, background: 'linear-gradient(90deg, #20bf6b 0%, #1abc9c 100%)', color: '#fff' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 64 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <GavelIcon sx={{ fontSize: 32, color: '#fff' }} />
                <Typography variant="h6" fontWeight={700} sx={{ color: '#fff', textShadow: '0 2px 8px #0002' }}>
                  Quản trị Validator
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Tooltip title="Địa chỉ ví admin">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <AccountBalanceWalletIcon sx={{ color: '#fff' }} />
                    <Typography sx={{ fontWeight: 600, fontSize: 15, color: '#fff' }}>{account ? account.slice(0, 6) + '...' + account.slice(-4) : 'Chưa kết nối'}</Typography>
                  </Stack>
                </Tooltip>
                <Tooltip title="Số stake">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <MonetizationOnIcon sx={{ color: '#ffe082' }} />
                    <Typography sx={{ fontWeight: 600, fontSize: 15, color: '#ffe082' }}>{stake !== "" ? stake : "..."} NLC</Typography>
                  </Stack>
                </Tooltip>
              </Stack>
            </Toolbar>
          </AppBar>

          {/* Trạng thái validator của tài khoản hiện tại */}
          <Box mb={3}>
            <Card sx={{ p: 2, borderLeft: '6px solid #20bf6b', background: 'linear-gradient(90deg, #f0fff0 0%, #e6fff9 100%)', boxShadow: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700} color="primary" mb={1}>
                  Trạng thái Validator của tài khoản này:
                </Typography>
                {validatorInfo.loading ? (
                  <Typography color="text.secondary">Đang kiểm tra trạng thái...</Typography>
                ) : validatorInfo.error ? (
                  <Typography color="error">{validatorInfo.error}</Typography>
                ) : (
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Chip label={validatorInfo.isActive ? 'Đang hoạt động' : 'Không hoạt động'} color={validatorInfo.isActive ? 'success' : 'default'} />
                    <Typography fontWeight={600}>Stake:</Typography>
                    <Typography>{validatorInfo.stakedAmount} NLC</Typography>
                    <Typography fontWeight={600}>Số lần bị phạt:</Typography>
                    <Typography>{validatorInfo.slashedCount}</Typography>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Box>

          <Stack spacing={3}>
            {/* Slash Validator */}
            <Card sx={{ p: 2, borderLeft: '6px solid #e67e22', background: 'linear-gradient(90deg, #fffbe6 0%, #fff3e0 100%)', boxShadow: 3 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                  <GavelIcon color="warning" />
                  <Typography variant="h6" fontWeight={700} color="warning.main">Phạt validator (slashValidator)</Typography>
                </Stack>
                <form onSubmit={handleSlash} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <TextField required label="Địa chỉ validator" value={slashAddress} onChange={e => setSlashAddress(e.target.value)} size="small" />
                  <TextField required label="% số tiền stake" type="number" value={slashPercent} onChange={e => setSlashPercent(e.target.value)} size="small" />
                  <Button type="submit" variant="contained" color="warning">Phạt</Button>
                  {slashStatus && <span style={{ marginLeft: 8, color: '#e67e22', fontWeight: 600 }}>{slashStatus}</span>}
                </form>
              </CardContent>
            </Card>
            {/* Force Deactivate Validator */}
            <Card sx={{ p: 2, borderLeft: '6px solid #c0392b', background: 'linear-gradient(90deg, #ffeaea 0%, #fff3f0 100%)', boxShadow: 3 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                  <BlockIcon color="error" />
                  <Typography variant="h6" fontWeight={700} color="error.main">Vô hiệu hóa validator (forceDeactivateValidator)</Typography>
                </Stack>
                <form onSubmit={handleDeactivate} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <TextField required label="Địa chỉ validator" value={deactivateAddress} onChange={e => setDeactivateAddress(e.target.value)} size="small" />
                  <Button type="submit" variant="contained" color="error">Vô hiệu hóa</Button>
                  {deactivateStatus && <span style={{ marginLeft: 8, color: '#c0392b', fontWeight: 600 }}>{deactivateStatus}</span>}
                </form>
              </CardContent>
            </Card>
            {/* Resolve Fraud Report */}
            <Card sx={{ p: 2, borderLeft: '6px solid #1976d2', background: 'linear-gradient(90deg, #e3f2fd 0%, #f0f7ff 100%)', boxShadow: 3 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                  <VerifiedUserIcon color="primary" />
                  <Typography variant="h6" fontWeight={700} color="primary.main">Xử lý báo cáo gian lận (resolveFraudReport)</Typography>
                </Stack>
                <form onSubmit={handleResolveFraud} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <TextField required label="ID báo cáo" value={fraudId} onChange={e => setFraudId(e.target.value)} size="small" />
                  <TextField required label="Phán quyết (true/false)" value={fraudDecision} onChange={e => setFraudDecision(e.target.value)} size="small" />
                  <Button type="submit" variant="contained" color="primary">Xử lý</Button>
                  {fraudStatus && <span style={{ marginLeft: 8, color: '#1976d2', fontWeight: 600 }}>{fraudStatus}</span>}
                </form>
              </CardContent>
            </Card>
            {/* Add Trusted Reporter */}
            <Card sx={{ p: 2, borderLeft: '6px solid #20bf6b', background: 'linear-gradient(90deg, #e0fff3 0%, #e6fff9 100%)', boxShadow: 3 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                  <PersonAddIcon color="success" />
                  <Typography variant="h6" fontWeight={700} color="success.main">Thêm trusted reporter (addTrustedReporter)</Typography>
                </Stack>
                <form onSubmit={handleAddTrusted} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <TextField required label="Địa chỉ reporter" value={trustedReporter} onChange={e => setTrustedReporter(e.target.value)} size="small" />
                  <Button type="submit" variant="contained" color="success">Thêm</Button>
                  {trustedStatus && <span style={{ marginLeft: 8, color: '#20bf6b', fontWeight: 600 }}>{trustedStatus}</span>}
                </form>
              </CardContent>
            </Card>
            {/* Remove Trusted Reporter */}
            <Card sx={{ p: 2, borderLeft: '6px solid #607d8b', background: 'linear-gradient(90deg, #f0f4f8 0%, #e3eaf2 100%)', boxShadow: 3 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                  <PersonRemoveIcon color="info" />
                  <Typography variant="h6" fontWeight={700} color="info.main">Xóa trusted reporter (removeTrustedReporter)</Typography>
                </Stack>
                <form onSubmit={handleRemoveTrusted} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <TextField required label="Địa chỉ reporter" value={removeReporter} onChange={e => setRemoveReporter(e.target.value)} size="small" />
                  <Button type="submit" variant="contained" color="info">Xóa</Button>
                  {removeStatus && <span style={{ marginLeft: 8, color: '#607d8b', fontWeight: 600 }}>{removeStatus}</span>}
                </form>
              </CardContent>
            </Card>
            {/* Set Mispricing Parameters */}
            <Card sx={{ p: 2, borderLeft: '6px solid #f39c12', background: 'linear-gradient(90deg, #fff8e1 0%, #fffde7 100%)', boxShadow: 3 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                  <SettingsIcon color="secondary" />
                  <Typography variant="h6" fontWeight={700} color="secondary.main">Cập nhật ngưỡng phạt giá (setMispricingParameters)</Typography>
                </Stack>
                <form onSubmit={handleSetMispricing} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <TextField required label="Ngưỡng phạt (%)" type="number" value={mispricingThreshold} onChange={e => setMispricingThreshold(e.target.value)} size="small" />
                  <TextField required label="% phạt (slash %)" type="number" value={mispricingSlashPercent} onChange={e => setMispricingSlashPercent(e.target.value)} size="small" />
                  <Button type="submit" variant="contained" color="secondary">Cập nhật</Button>
                  {mispricingStatus && <span style={{ marginLeft: 8, color: '#f39c12', fontWeight: 600 }}>{mispricingStatus}</span>}
                </form>
              </CardContent>
            </Card>
          </Stack>

          {/* Danh sách báo cáo mispricing */}
          <Box mt={5}>
            <Card sx={{ borderLeft: '6px solid #f39c12', background: 'linear-gradient(90deg, #fffbe6 0%, #fffde7 100%)', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} color="warning.main" mb={2}>
                  Danh sách báo cáo mispricing
                </Typography>
                {loadingMispricing ? (
                  <Typography color="text.secondary">Đang tải...</Typography>
                ) : errorMispricing ? (
                  <Typography color="error">{errorMispricing}</Typography>
                ) : mispricingReports.length === 0 ? (
                  <Typography color="text.secondary">Không có báo cáo mispricing nào.</Typography>
                ) : (
                  <Box sx={{ maxHeight: 350, overflowY: 'auto', pr: 1 }}>
                   
                    {
                    mispricingReports.map((r) => (
                      <Paper
                        key={r.transactionHash + '-' + r.reportIndex}
                        sx={{ p: 3, mb: 4, minHeight: 110, background: '#fff', borderLeft: '4px solid #f39c12', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 6 } }}
                        onClick={() => { setSelectedReport(r); setOpenDetail(true); }}
                      >
                        <Stack direction="row" spacing={3} alignItems="flex-start" mb={1}>
                          <Chip label={`ID: ${r.reportIndex}`} color="warning" size="small" />
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography fontWeight={600} display="inline">Validator:</Typography>{' '}
                            <Typography display="inline" sx={{ wordBreak: 'break-all', fontFamily: 'monospace' }}>{r.validator}</Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={3} alignItems="center" mb={1}>
                          <Typography fontWeight={600}>Expected:</Typography>
                          <Typography>{r.expectedValue}</Typography>
                          <Typography fontWeight={600}>Actual:</Typography>
                          <Typography>{r.actualValue}</Typography>
                        </Stack>
                        <Typography mt={1} variant="caption" color="text.secondary">Block: {r.blockNumber} | Tx: {r.transactionHash.slice(0, 10)}...</Typography>
                      </Paper>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Dialog chi tiết báo cáo mispricing */}
        <Dialog open={openDetail} onClose={() => setOpenDetail(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            Chi tiết báo cáo mispricing
            <IconButton aria-label="close" onClick={() => setOpenDetail(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {console.log('selectedReport:', selectedReport)}
            {selectedReport ? (
              <Stack spacing={2}>
                <Typography><b>ID:</b> {selectedReport.reportIndex}</Typography>
                <Typography><b>Validator:</b> <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{selectedReport.validator}</span></Typography>
                <Typography><b>Expected Value:</b> {selectedReport.expectedValue}</Typography>
                <Typography><b>Actual Value:</b> {selectedReport.actualValue}</Typography>
                <Typography><b>Block Number:</b> {selectedReport.blockNumber}</Typography>
                <Typography><b>Transaction Hash:</b> <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{selectedReport.transactionHash}</span></Typography>
                <Typography><b>Thời gian báo cáo:</b> {blockTimestamp ? blockTimestamp.toLocaleString() : 'Không xác định'}</Typography>
                {/* Hiển thị tổng số báo cáo mispricing */}
                {mispricingCount !== null && (
                  <Typography color="info.main"><b>Tổng số báo cáo mispricing:</b> {mispricingCount}</Typography>
                )}
                {/* Hiển thị báo cáo đầu tiên */}
                {firstReport && (
                  <Box sx={{ p: 1, border: '1px solid #eee', borderRadius: 1, background: '#fafafa' }}>
                    <Typography fontWeight={600}>🧪 Báo cáo đầu tiên (index = 0):</Typography>
                    <Typography variant="body2">expectedValue: {firstReport.expectedValue?.toString?.() ?? ''}</Typography>
                    <Typography variant="body2">actualValue: {firstReport.actualValue?.toString?.() ?? ''}</Typography>
                    <Typography variant="body2">resolved: {firstReport.resolved ? 'true' : 'false'}</Typography>
                  </Box>
                )}
                {mispricingStatus && (
                  <Typography color={mispricingStatus.includes('thành công') ? 'success.main' : 'error.main'} sx={{ mt: 2, fontWeight: 600 }}>
                    {mispricingStatus}
                  </Typography>
                )}
              </Stack>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDetail(false)} color="primary">Đóng</Button>
          </DialogActions>
        </Dialog>
      </>
    </ErrorBoundary>
  );
}
export default AdminActions;

