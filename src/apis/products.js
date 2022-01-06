import axios from "axios"

export const getTopCategorysApi = () => {
    return axios.get(`/categorys?isTop=${true}`).then(res => res.data.data)
}

export const getProductsByCategoryApi = async (categoryName) => {
    return (await axios.get(`/categorys/products/${categoryName}`)).data?.data
};

export const getProducts = async (bigDiscount, isBest, limit, offset) =>{
    return (await axios.get(`/products?${bigDiscount && `bigDiscount=${bigDiscount}`}&${isBest && `isBest=${isBest}`}&limit=${limit}&offset=${offset}`)).data?.data
}

export const getProductById = async (id) => {
    return (await axios.get(`/products/${id}`))
}

export const getProductRatings = async (id) => {
    const res = await axios.get(`/products/ratings/${id}`)
    return res
}