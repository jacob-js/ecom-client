import axios from 'axios';

export const sendOrderApi = async (data) => {
    return (await axios.post(`/orders`, data))?.data;
}

export const getOrdersApi = async (userId, limit, offset) => {
    return (await axios.get(`/orders/user/${userId}?limit=${limit}&offset=${offset}`))?.data;
}

export const getOrderApi = async (orderId) => {
    return (await axios.get(`/orders/${orderId}`))?.data;
}