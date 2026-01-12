import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api',
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('userInfo')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
    }
    return req;
});

export const fetchExpenses = () => API.get('/expenses');
export const createExpense = (newExpense) => API.post('/expenses', newExpense);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);
export const getMonthlySummary = () => API.get('/expenses/summary/monthly');
export const getYearlySummary = () => API.get('/expenses/summary/yearly');

export const categorizeText = (text) => API.post('/ai/categorize', { text });
export const getInsights = () => API.get('/ai/insights');

export default API;
