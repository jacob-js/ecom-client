import axios from "axios"

export const loginApi = (data) =>{
    return axios.post(`/users/login`, data)
}

export const signupApi = (data) =>{
    return axios.post(`/users`, data)
}

export const verifyAccountApi = (data) =>{
    return axios.post(`/users/validate`, data)
}

export const getCurrUserApi = () =>{
    return axios.get(`/users/current`)
}

export const sendOtpApi = (username) =>{
    return axios.get(`/users/send-otp/${username}`)
}

export const googleLoginApi = async(data) =>{
    return (await axios.post(`/users/oauth/google`, data))?.data
}

export const updateUser = async(id, data) =>{
    return (await axios.put(`/users/details/${id}`, data))?.data
}

export const sendResetPwdUsernameApi = async(username) =>{
    return (await axios.get(`/users/reset-password?email=${username}`))?.data
}

export const resetPwdCheckOtpApi = async(data) =>{
    return (await axios.post(`/users/reset-password`, data))?.data
};

export const updatePwdApi = async({token, newPwd}) =>{
    return (await axios.put(`/users/reset-password`, {newPwd}, {
        headers: {
            'update_pwd_token': token
        }
    }))?.data
}