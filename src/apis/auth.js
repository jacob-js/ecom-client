import axios from "axios"

export const loginApi = (data) =>{
    return axios.post(`/users/login`, data)
}

export const signupApi = (data) =>{
    return axios.post(`/users`, data)
}

export const verifyAccountApi = (data) =>{
    return axios.post(`/users/verify`, data)
}