import axios from "axios"

export const getTopCategorysApi = () => {
    return axios.get(`/categorys?isTop=${true}`).then(res => res.data.data)
}

export const getProductsByCategoryApi = async (categoryName, limit, offset) => {
    return (await axios.get(`/categorys/products/${categoryName}?limit=${limit}&offset=${offset}`)).data?.data
};

export const getProducts = async (bigDiscount, isBest, isNew, limit, offset) =>{
    return (await axios.get(`/products?${bigDiscount && `bigDiscount=${bigDiscount}`}&${isBest && `isBest=${isBest}`}${isNew && `isNew=${isNew}`}&limit=${limit}&offset=${offset}`)).data?.data
}

export const getProductById = async (id) => {
    return (await axios.get(`/products/${id}`))
}

export const getProductRatings = async (id) => {
    const res = await axios.get(`/products/ratings/${id}`)
    return res
}