import axios from "axios"

export const getTopCategorysApi = () => {
    return axios.get(`/categorys?isTop=${true}`).then(res => res.data.data)
}