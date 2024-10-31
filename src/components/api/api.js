import axios from 'axios';

export const fetchTasks = async () => {
  const response = await axios.get('/api/tasks');
  return response.data;
};

export const createTask = async (formData) => {
  await axios.post('https://task-manager-backend-twg2.onrender.com/api/tasks', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};
