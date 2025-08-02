import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT } from '../utils/constants'
import authorizedAxios from '../utils/authorizedAxios'


// khởi tạo giá trị của 1 slice trong redux (slice là 1 phần của store, 1 phần của board)
const initialState = {
  currentBorrower: null
}

//các hành động call API bất đồng bộ sẽ sử dụng createAsyncThunk kết hợp với extraReducers (web redux toolkit)

export const loginBorrowerAPI = createAsyncThunk(
    'borrower/loginBorrowerAPI', // cách đặt tên asyncthunk là tên slice/tên function
    async (data) => {
        const response = await authorizedAxios.put(`${API_ROOT}/server/borrowers/login`, data) 
        
        // response.data chưa được lưu vào store, muốn lưu phải thông qua extraReducers
        return response.data
    }
)

export const logOutAPI = createAsyncThunk(
  'borrower/logOutAPI',
  async () => {
    const response = await authorizedAxios.delete(`${API_ROOT}/server/borrowers/logout`)

    return response.data
  } 
)

export const updateBorrowerAPI = createAsyncThunk(
  'borrower/updateBorrowerAPI',
  async (data) => {
    const response = await authorizedAxios.put(`${API_ROOT}/server/borrowers/updateBorrower`, data)
    return response.data
  } 
)

//Khởi tạo 1 SLICE trong redux
export const borrowerSlice = createSlice({
  name: 'borrower',
  initialState,
  reducers: {
   
  },

  // extrareducer xử lí dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginBorrowerAPI.fulfilled, (state,action) => {
        state.currentBorrower = action.payload 
    })

    builder.addCase(logOutAPI.fulfilled, (state) => {
      state.currentBorrower = null;
    })

    builder.addCase(updateBorrowerAPI.fulfilled, (state,action) => {
      state.currentBorrower = action.payload

    })
}
})


// Selectors: Là nơi dùng để component lấy dữ liệu từ store bằng hook useSelector(), nhưng không thể thay đổi dữ liệu trong store
// tác dụng ngược lại với actions, actions dùng update date trong redux, còn selectors dùng để lấy dữ liệu ra
export const selectCurrentBorrower = (state) => state.borrower.currentBorrower; // Phù hợp với tên slice mới


// không export cả activeBoardSlice mà chỉ export ra phần reducer là một phần trong slice
// export default activeBoardSlice.reducer
export const borrowerReducer = borrowerSlice.reducer