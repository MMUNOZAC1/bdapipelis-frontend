import { axiosInstance as axios } from '../helper/axios-config';

export const getTipos = async () => {
  return await axios.get('/tipo');
};

export const createTipo = async (data) => {
  return await axios.post('/tipo', data);
};

export const updateTipo = async (id, data) => {
  return await axios.put(`/tipo/${id}`, data);
};

export const deleteTipo = async (id) => {
  return await axios.delete(`/tipo/${id}`);
};