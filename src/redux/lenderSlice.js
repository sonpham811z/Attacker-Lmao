import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT } from '../utils/constants'
import authorizedAxios from '../utils/authorizedAxios'


// khởi tạo giá trị của 1 slice trong redux (slice là 1 phần của store, 1 phần của board)
const initialState = {
  currentLender: null
}

//các hành động call API bất đồng bộ sẽ sử dụng createAsyncThunk kết hợp với extraReducers (web redux toolkit)

export const loginLenderAPI = createAsyncThunk(
    'lender/loginBorrowerAPI', // cách đặt tên asyncthunk là tên slice/tên function
    async (data) => {
        const response = await authorizedAxios.put(`${API_ROOT}/server/lenders/login`, data) 
        
        return response.data
    }
)

export const logOutAPI = createAsyncThunk(
  'lender/logOutAPI',
  async () => {
    const response = await authorizedAxios.delete(`${API_ROOT}/server/lenders/logout`)

    return response.data
  } 
)

export const updateLenderAPI = createAsyncThunk(
  'lender/updateLenderAPI',
  async (data) => {
    const response = await authorizedAxios.put(`${API_ROOT}/server/lenders/updateLender`, data)
    return response.data
  } 
)

//Khởi tạo 1 SLICE trong redux
export const lenderSlice = createSlice({
  name: 'lender',
  initialState,
  reducers: {
   
  },

  // extrareducer xử lí dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginLenderAPI.fulfilled, (state,action) => {
        state.currentLender = action.payload 
    })

    builder.addCase(logOutAPI.fulfilled, (state) => {
      state.currentLender = null;
    })

    builder.addCase(updateLenderAPI.fulfilled, (state,action) => {
      state.currentLender = action.payload

    })
}
})


// Selectors: Là nơi dùng để component lấy dữ liệu từ store bằng hook useSelector(), nhưng không thể thay đổi dữ liệu trong store
// tác dụng ngược lại với actions, actions dùng update date trong redux, còn selectors dùng để lấy dữ liệu ra
export const selectCurrentLender = (state) => state.lender.currentLender; // Phù hợp với tên slice mới


// không export cả activeBoardSlice mà chỉ export ra phần reducer là một phần trong slice
// export default activeBoardSlice.reducer
export const lenderReducer = lenderSlice.reducer