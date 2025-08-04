import authorizedAxios from '../utils/authorizedAxios'
import { API_ROOT } from '../utils/constants'
import { toast } from 'react-toastify'

export const registerAccountAPI = async (formData) => {
    const response = await authorizedAxios.post(
      `${API_ROOT}/server/borrowers/register`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    toast.success('Account created successfully, please check your email to verify your account')
    return response.data
  }
  
export const refreshTokenAPI = async() => {
    return await authorizedAxios.put(`${API_ROOT}/server/borrowers/refreshToken`)
}

export const verifyAccountAPI = async(data) => {
    const response = await authorizedAxios.put(`${API_ROOT}/server/borrowers/verifyAccount`, data)
    toast.success('Account verify successfully, Login to use our services')
    return response.data

}

export const registerLenderAccountAPI = async (formData) => {
  const response = await authorizedAxios.post(
    `${API_ROOT}/server/lenders/register`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  toast.success('Account created successfully, please check your email to verify your account')
  return response.data
}

export const refreshTokenLenderAPI = async() => {
  return await authorizedAxios.put(`${API_ROOT}/server/lenders/refreshToken`)
}

export const verifyAccountLendersAPI = async(data) => {
  const response = await authorizedAxios.put(`${API_ROOT}/server/lenders/verifyAccount`, data)
  toast.success('Account verify successfully, Login to use our services')
  return response.data

}

export const registerValidatorAccountAPI = async (formData) => {
  const response = await authorizedAxios.post(
    `${API_ROOT}/server/validators/register`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  toast.success('Account created successfully, please check your email to verify your account')
  return response.data
}

export const refreshTokenValidatorAPI = async() => {
  return await authorizedAxios.put(`${API_ROOT}/server/validators/refreshToken`)
}

export const verifyAccountValidatorsAPI = async(data) => {
  const response = await authorizedAxios.put(`${API_ROOT}/server/validators/verifyAccount`, data)
  toast.success('Account verify successfully, Login to use our services')
  return response.data

}