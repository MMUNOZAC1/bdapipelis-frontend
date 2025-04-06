import { axiosInstance } from '../helper/axios-config';

export const getProductoras = async () => {
  return await axiosInstance.get('/productora');
};

export const createProductora = async (data) => {
  return await axiosInstance.post('/productora', data);
};

export const updateProductora = async (nombre, data) => {
  return await axiosInstance.put(`/productora/${nombre}`, data);
};

export const deleteProductora = async (nombre) => {
  return await axiosInstance.delete(`/productora/${nombre}`);
};