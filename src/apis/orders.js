import axios from 'axios';

export const sendOrderApi = async (data) => {
    return (await axios.post(`/orders`, data))?.data;
}

export const getOrdersApi = async (userId, limit, offset) => {
    return (await axios.get(`/orders/${userId}?limit=${limit}&offset=${offset}`))?.data;
}