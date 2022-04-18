import axios from "axios"

export const getParentsCategApi = async() =>{
    return ( await axios.get(`/categorys/parents/categorys`) ).data?.data
}