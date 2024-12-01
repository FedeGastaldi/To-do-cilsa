import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const getTasks = () => axios.get(`${BASE_URL}/tasks`);

export const createTask = (nombre) => axios.post(`${BASE_URL}/tasks`, { nombre });

export const updateTask = (id, estado) => 
    axios.put(`${BASE_URL}/tasks/${id}`, { estado });

export const deleteTask = (id) => axios.delete(`${BASE_URL}/tasks/${id}`);

export const editTask = (id, nombre) => 
    axios.put(`${BASE_URL}/tasks/edit/${id}`, { nombre });
