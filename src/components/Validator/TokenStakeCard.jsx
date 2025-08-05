import React from "react";
import { useWeb3 } from '../../contexts/Web3Context';
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from "@mui/material";
import { ethers } from "ethers";

function TokenStakeCard() {
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [deactivateStatus, setDeactivateStatus] = useState('');

  // ...các khai báo useState khác...

  // Debug log trạng thái validator (sau khi đã khai báo useState)
  // Đặt dòng này SAU tất cả các useState

  const handleDeactivateValidator = async () => {
    if (!contract) return;
    setIsDeactivating(true);
    setDeactivateStatus('Đang gửi giao dịch...');
    try {
      const tx = await contract.deactivateValidator();
      setDeactivateStatus('Đang chờ xác nhận...');
      await tx.wait();
      setDeactivateStatus('Dừng hoạt động thành công!');
      // Cập nhật lại trạng thái
      const info = await contract.validators(account);
      setIsActive(info.isActive);
      setSlashedCount(info.slashedCount ? Number(info.slashedCount) : 0);
    } catch (e) {
      setDeactivateStatus('Dừng hoạt động thất bại!');
    }
    setIsDeactivating(false);
  };

  const [isActive, setIsActive] = useState(false);
  const [slashedCount, setSlashedCount] = useState(0);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerStatus, setRegisterStatus] = useState('');
  const [isReactivating, setIsReactivating] = useState(false);
  const [reactivateStatus, setReactivateStatus] = useState('');

  const handleWithdrawStake = async () => {
    if (!contract) return;
    setIsWithdrawing(true);
    setTxStatus('Đang gửi giao dịch...');
    try {
      const tx = await contract.withdrawStake();
      setTxStatus('Đang chờ xác nhận...');
      await tx.wait();
      setTxStatus('Rút stake thành công!');
      // Cập nhật lại số dư stake và trạng thái
      const info = await contract.validators(account);
      setStakedAmount(info.stakedAmount ? info.stakedAmount.toString() : '0');
      setIsActive(info.isActive);
      setSlashedCount(info.slashedCount ? Number(info.slashedCount) : 0);
    } catch (e) {
      setTxStatus('Rút stake thất bại!');
    }
    setIsWithdrawing(false);
  };

  const handleRegisterValidator = async () => {
    if (!contract) return;
    setIsRegistering(true);
    setRegisterStatus('Đang gửi giao dịch...');
    try {
      const tx = await contract.registerValidator({ value: ethers.parseEther('0.1') });
      setRegisterStatus('Đang chờ xác nhận...');
      await tx.wait();
      setRegisterStatus('Đăng ký thành công!');
      // Cập nhật lại số dư stake và trạng thái
      const info = await contract.validators(account);
      setStakedAmount(info.stakedAmount ? info.stakedAmount.toString() : '0');
      setIsActive(info.isActive);
      setSlashedCount(info.slashedCount ? Number(info.slashedCount) : 0);
    } catch (e) {
      let reason = '';
      if (e?.reason) reason = e.reason;
      else if (e?.data?.message) reason = e.data.message;
      else if (e?.message) reason = e.message;
      else reason = JSON.stringify(e);
      setRegisterStatus('Đăng ký thất bại! ' + reason);
      console.error('Đăng ký validator lỗi:', e);
    }
    setIsRegistering(false);
  };

  const handleReactivateValidator = async () => {
    if (!contract) return;
    setIsReactivating(true);
    setReactivateStatus('Đang gửi giao dịch...');
    try {
      const tx = await contract.reactivateValidator({ value: ethers.parseEther('0.1') });
      setReactivateStatus('Đang chờ xác nhận...');
      await tx.wait();
      setReactivateStatus('Tái kích hoạt thành công!');
      // Cập nhật lại số dư stake và trạng thái
      const info = await contract.validators(account);
      setStakedAmount(info.stakedAmount ? info.stakedAmount.toString() : '0');
      setIsActive(info.isActive);
      setSlashedCount(info.slashedCount ? Number(info.slashedCount) : 0);
    } catch (e) {
      setReactivateStatus('Tái kích hoạt thất bại!');
    }
    setIsReactivating(false);
  };
  const { isConnected, account, contract } = useWeb3();
  const [stakedAmount, setStakedAmount] = useState('0');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [txStatus, setTxStatus] = useState('');

  useEffect(() => {
    // Reset state khi đổi ví hoặc contract
    setStakedAmount('0');
    setIsActive(false);
    setSlashedCount(0);
    const fetchStake = async () => {
      if (isConnected && account && contract) {
        try {
          const info = await contract.validators(account);
          setStakedAmount(info.stakedAmount ? info.stakedAmount.toString() : '0');
          setIsActive(info.isActive);
          setSlashedCount(info.slashedCount ? Number(info.slashedCount) : 0);
        } catch (e) {
          setStakedAmount('0');
          setIsActive(false);
          setSlashedCount(0);
        }
      }
    };
    fetchStake();
  }, [isConnected, account, contract]);
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} mb={1}>
          Token đã stake
        </Typography>
        <Typography variant="h4" color="primary" fontWeight={700}>
          {isConnected ? stakedAmount : '0'} NLC
        </Typography>
        <Box mt={2}>
          <Typography variant="caption" color="text.secondary">
            Có thể rút stake sau 7 ngày
          </Typography>
        </Box>
        {isConnected && (
          <Box mt={2}>
            {/* Đăng ký mới */}
            {!isActive && slashedCount < 3 && stakedAmount === '0' && (
              <>
                <button
                  onClick={handleRegisterValidator}
                  disabled={isRegistering}
                  style={{
                    padding: '8px 20px',
                    background: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    fontWeight: 700,
                    cursor: isRegistering ? 'not-allowed' : 'pointer',
                    marginRight: '12px'
                  }}
                >
                  {isRegistering ? 'Đang đăng ký...' : 'Đăng ký làm Validator'}
                </button>
                {registerStatus && (
                  <Typography variant="body2" color="primary" mt={1}>{registerStatus}</Typography>
                )}
              </>
            )}
            {/* Tái kích hoạt */}
            {!isActive && slashedCount < 3 && stakedAmount !== '0' && (
              <>
                <button
                  onClick={handleReactivateValidator}
                  disabled={isReactivating}
                  style={{
                    padding: '8px 20px',
                    background: '#ff9800',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    fontWeight: 700,
                    cursor: isReactivating ? 'not-allowed' : 'pointer',
                    marginRight: '12px'
                  }}
                >
                  {isReactivating ? 'Đang tái kích hoạt...' : 'Tái kích hoạt Validator'}
                </button>
                {reactivateStatus && (
                  <Typography variant="body2" color="primary" mt={1}>{reactivateStatus}</Typography>
                )}
              </>
            )}
            {/* Đang hoạt động */}
            {isActive && (
              <>
                <Typography variant="body2" color="success.main" fontWeight={700} sx={{ mr: 2 }}>
                  Validator đang hoạt động
                </Typography>
                <button
                  onClick={handleDeactivateValidator}
                  disabled={isDeactivating}
                  style={{
                    padding: '8px 20px',
                    background: '#e53935',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    fontWeight: 700,
                    cursor: isDeactivating ? 'not-allowed' : 'pointer',
                    marginLeft: '12px'
                  }}
                >
                  {isDeactivating ? 'Đang dừng...' : 'Dừng hoạt động'}
                </button>
                {deactivateStatus && (
                  <Typography variant="body2" color="primary" mt={1}>{deactivateStatus}</Typography>
                )}
              </>
            )}
            {/* Rút stake */}
            <button
              onClick={handleWithdrawStake}
              disabled={isWithdrawing || stakedAmount === '0'}
              style={{
                padding: '8px 20px',
                background: '#20bf6b',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                fontWeight: 700,
                cursor: isWithdrawing || stakedAmount === '0' ? 'not-allowed' : 'pointer'
              }}
            >
              {isWithdrawing ? 'Đang rút stake...' : 'Rút stake về ví'}
            </button>
            {txStatus && (
              <Typography variant="body2" color="primary" mt={1}>{txStatus}</Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}


export default TokenStakeCard;
