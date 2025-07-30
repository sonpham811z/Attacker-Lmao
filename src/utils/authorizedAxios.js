
import axios from 'axios'
import { toast } from 'react-toastify'
import { logOutAPI } from '../redux/borrowerSlice'
import { interceptorLoadingElements } from '../utils/formatter'
import { refreshTokenAPI } from '../apis/index'


const authorizedAxios = axios.create({})

authorizedAxios.defaults.timeout = 1000*60*10 // Tất cả các req nếu be trả về data quá 10p thì cancel req.
authorizedAxios.defaults.withCredentials = true

// Vì redux chỉ sử dụng trong các file react componet nên ta phải dùng kĩ thuật Injectstore
let store

export const injectStore = mainStore => {
  store = mainStore
}

authorizedAxios.interceptors.request.use((config) => {
    // Do something before request is sent

    interceptorLoadingElements(true)
    return config
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

let refreshTokenPromise = null

authorizedAxios.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    interceptorLoadingElements(false)
    return response
}, async(error) => {
    //TH1 : 401,.. logout luôn
    if(error.response.status === 401)
    {
        store.dispatch(logOutAPI())
        console.log(error);
    }

    // TH2: 410 call API refreshToken
    const originalRequest = error.config
    if(error.response.status === 410 && originalRequest)
    {
        if(!refreshTokenPromise)
        {
            refreshTokenPromise = refreshTokenAPI().then(()=>{

            }).catch(err => {
                store.dispatch(logOutAPI(true))
                return Promise.reject(err)
            }).finally(() => {
                refreshTokenPromise = null
            })
        }

        return refreshTokenPromise.then(()=>{
            return authorizedAxios(originalRequest)
        })
    }




    // Any status codes that falls outside the range of 2xx cause this function to trigger

    interceptorLoadingElements(false)
    let errorMessage = error.message
    if(error.response?.data?.message) {
        errorMessage = error.response.data.message
    }

    // Tất cả các các status code trừ 410 (token) sẽ hiện thông báo ở đây

    if(error.response?.status !== 410) {
        toast.error(errorMessage, {
            position: "bottom-right",
            theme: "colored"
        })
    }
    // Do something with response error
    return Promise.reject(error)
  
});

export default authorizedAxios