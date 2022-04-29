import axios from 'axios';

export const sendOrderApi = async (data) => {
    return (await axios.post(`/orders`, data))?.data;
}

export const getOrdersApi = async (userId, limit, offset, status=null) => {
    const url = status ? `/orders?userId=${userId}&status=${status}&limit=${limit}&offset=${offset}` :
                `/orders?userId=${userId}&limit=${limit}&offset=${offset}`;
    return (await axios.get(url))?.data;
}

export const getOrderApi = async (orderId) => {
    return (await axios.get(`/orders/${orderId}`))?.data;
}