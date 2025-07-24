// Hàm này dùng để fetch lịch sử giao dịch ETH của một địa chỉ từ Etherscan


const ETHERSCAN_API_KEY = '4WY457QD9EXRASRE5A8NUNP3GT6TD7PW5Y';
const ETHERSCAN_BASE_URL = 'https://api-sepolia.etherscan.io/api';

// Hàm lấy lịch sử giao dịch ETH
export async function getTxHistory(address, { page = 1, offset = 20, apiKey } = {}) {
  if (!address || typeof address !== 'string') {
    throw new Error('Address is required');
  }
  const key = apiKey || ETHERSCAN_API_KEY;
  const url = `${ETHERSCAN_BASE_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=desc&apikey=${key}`;
  const response = await fetch(url);
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    throw new Error('API trả về dữ liệu không hợp lệ (không phải JSON). Có thể sai endpoint, key, hoặc hết quota.\n' + text.slice(0, 200));
  }
  const data = await response.json();
  if (!data || !data.result) {
    throw new Error(data.message || "Something went wrong");
  }
  return data.result;
}

// Thêm hàm lấy thông tin ví ETH
export async function getWalletInfo(address, apiKey) {
  if (!address || typeof address !== 'string') {
    throw new Error('Address is required');
  }
  const key = apiKey || ETHERSCAN_API_KEY;
  const balanceUrl = `${ETHERSCAN_BASE_URL}?module=account&action=balance&address=${address}&apikey=${key}`;
  // Lấy tối đa 10.000 giao dịch để đếm số lần giao dịch trên testnet
  const txCountUrl = `${ETHERSCAN_BASE_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10000&sort=desc&apikey=${key}`;
  const tokenUrl = `${ETHERSCAN_BASE_URL}?module=account&action=tokentx&address=${address}&page=1&offset=5&sort=desc&apikey=${key}`;

  async function safeFetchJson(url) {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error('API trả về dữ liệu không hợp lệ (không phải JSON). Có thể sai endpoint, key, hoặc hết quota.\n' + text.slice(0, 200));
    }
    return response.json();
  }
  let balance = 0, txCount = 0, tokens = [];
  let error = null;
  try {
    const [balanceRes, txRes, tokenRes] = await Promise.all([
      safeFetchJson(balanceUrl),
      safeFetchJson(txCountUrl),
      safeFetchJson(tokenUrl),
    ]);
    if (balanceRes.result && !isNaN(balanceRes.result)) {
      balance = parseFloat(balanceRes.result) / 1e18;
      if (isNaN(balance)) balance = 0;
      balance = Math.round(balance * 10000) / 10000;
    }
    if (Array.isArray(txRes.result)) {
      txCount = txRes.result.length;
    } else {
      error = txRes.message || 'Không lấy được số giao dịch. Có thể API bị lỗi hoặc hết quota.';
    }
    tokens = tokenRes.result ? tokenRes.result : [];
  } catch (err) {
    error = err.message || 'Lỗi không xác định khi lấy thông tin ví.';
  }
  return {
    balance,
    txCount,
    tokens,
    error,
  };
}