import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT } from '../utils/constants'
import authorizedAxios from '../utils/authorizedAxios'


// khởi tạo giá trị của 1 slice trong redux (slice là 1 phần của store, 1 phần của board)
const initialState = {
  currentValidator: null
}

//các hành động call API bất đồng bộ sẽ sử dụng createAsyncThunk kết hợp với extraReducers (web redux toolkit)

export const loginValidatorAPI = createAsyncThunk(
    'validator/loginBorrowerAPI', // cách đặt tên asyncthunk là tên slice/tên function
    async (data) => {
        const response = await authorizedAxios.put(`${API_ROOT}/server/validators/login`, data) 
        
        return response.data
    }
)

export const logOutAPI = createAsyncThunk(
  'validator/logOutAPI',
  async () => {
    const response = await authorizedAxios.delete(`${API_ROOT}/server/validators/logout`)

    return response.data
  } 
)

export const updateValidatorAPI = createAsyncThunk(
  'validator/updateValidatorAPI',
  async (data) => {
    const response = await authorizedAxios.put(`${API_ROOT}/server/validators/updateValidator`, data)
    return response.data
  } 
)

//Khởi tạo 1 SLICE trong redux
export const validatorSlice = createSlice({
  name: 'validator',
  initialState,
  reducers: {
   
  },

  // extrareducer xử lí dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginValidatorAPI.fulfilled, (state,action) => {
        state.currentValidator = action.payload 
    })

    builder.addCase(logOutAPI.fulfilled, (state) => {
      state.currentValidator = null;
    })

    builder.addCase(updateValidatorAPI.fulfilled, (state,action) => {
      state.currentValidator = action.payload

    })
}
})


// Selectors: Là nơi dùng để component lấy dữ liệu từ store bằng hook useSelector(), nhưng không thể thay đổi dữ liệu trong store
// tác dụng ngược lại với actions, actions dùng update date trong redux, còn selectors dùng để lấy dữ liệu ra
export const selectCurrentValidator = (state) => state.validator.currentValidator; // Phù hợp với tên slice mới


// không export cả activeBoardSlice mà chỉ export ra phần reducer là một phần trong slice
// export default activeBoardSlice.reducer
export const validatorReducer = validatorSlice.reducer