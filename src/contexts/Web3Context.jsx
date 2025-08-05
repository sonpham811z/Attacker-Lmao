import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';
import   {ethers } from 'ethers';
// ...existing code...

// =================================================================
// BƯỚC 1: CẤU HÌNH ĐỊA CHỈ VÀ ABI CỦA SMART CONTRACT
// Dán địa chỉ và ABI bạn đã deploy từ Remix vào đây.
// =================================================================
import { validatorRegistryAddress, validatorRegistryABI } from '../contracts/contract-info';

// =================================================================
// BƯỚC 2: TẠO CONTEXT ĐỂ QUẢN LÝ TRẠNG THÁI WEB3
// =================================================================
const Web3Context = createContext();
export const useWeb3 = () => useContext(Web3Context);

const Web3Provider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // Danh sách báo cáo gian lận toàn cục
    const [fraudReports, setFraudReports] = useState([]);

    // Hàm thêm báo cáo mới
    const addFraudReport = (report) => {
        setFraudReports(prev => [
            { id: Date.now(), ...report },
            ...prev
        ]);
    };

    const connectWallet = useCallback(async () => {
        if (typeof window.ethereum === 'undefined') {
            alert("Vui lòng cài đặt MetaMask!");
            return;
        }
        setIsLoading(true);
        try {
            const web3Provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await web3Provider.send("eth_requestAccounts", []);
            const web3Signer = await web3Provider.getSigner();
            const currentAccount = accounts[0];
            setProvider(web3Provider);
            setSigner(web3Signer);
            setAccount(currentAccount);
            setIsConnected(true);
            // Debug log để kiểm tra giá trị trước khi khởi tạo contract
            console.log('validatorRegistryAddress:', validatorRegistryAddress);
            console.log('validatorRegistryABI:', validatorRegistryABI);
            console.log('web3Signer:', web3Signer);
            if (!validatorRegistryAddress || !validatorRegistryABI || !web3Signer) {
                throw new Error('Thiếu thông tin contract hoặc signer');
            }
            const validatorRegistry = new ethers.Contract(
                validatorRegistryAddress,
                validatorRegistryABI,
                web3Signer
            );
            setContract(validatorRegistry);
        } catch (error) {
            console.error("Kết nối ví thất bại", error);
            alert("Kết nối ví thất bại.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <Web3Context.Provider value={{
            account,
            isConnected,
            isLoading,
            contract,
            connectWallet,
            fraudReports,
            addFraudReport,
        }}>
            {children}
        </Web3Context.Provider>
    );
};

export { Web3Provider };
