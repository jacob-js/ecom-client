import axios from 'axios';

export const sendOrderApi = async (data) => {
    return (await axios.post(`/orders`, data))?.data;
}