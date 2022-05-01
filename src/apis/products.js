import axios from "axios"

export const getTopCategorysApi = () => {
    return axios.get(`/categorys?isTop=${true}`).then(res => res.data.data)
}

export const getCategorysApi = async() => {
    return (await axios.get(`/categorys`))?.data.data
}

export const getProductsByCategoryApi = async (categoryName, limit, offset) => {
    return (await axios.get(`http://localhost:5000/api/v1/categorys/products/${categoryName}?limit=${limit}&offset=${offset}`))?.data?.data
};

export const getProducts = async (bigDiscount, isBest, isNew, limit, offset) =>{
    return (await axios.get(`/products?${bigDiscount && `bigDiscount=${bigDiscount}`}&${isBest && `isBest=${isBest}`}${isNew && `isNew=${isNew}`}&limit=${limit}&offset=${offset}`)).data?.data
}

export const getProductById = async (id) => {
    return (await axios.get(`/products/${id}`))
}

export const getProductRatings = async (id) => {
    return (await axios.get(`/products/ratings/${id}`))?.data?.data
}
export const rateProducApi = async (id, data) => {
    return (await axios.post(`/products/ratings/${id}`, data))?.data
}

export const searchProductsApi = async(query, limit, offset, categoryId) => {
    return (await axios.get(`/products/search/all?query=${query}&limit=${limit}&offset=${offset}&categoryId=${categoryId}`))?.data?.data
}