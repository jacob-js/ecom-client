import axios from "axios"

export const getTopCategorysApi = () => {
    return axios.get(`/categorys?isTop=${true}`).then(res => res.data.data)
}

export const getProductsByCategoryApi = async (categoryName) => {
    return (await axios.get(`/categorys/products/${categoryName}`)).data?.data
};