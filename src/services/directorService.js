import { axiosInstance } from '../helper/axios-config';

const getDirectors = () => {
  return axiosInstance.get('directores');
};

const createDirector = (data) => {
  return axiosInstance.post('directores', data);
};

const updateDirector = (id, data) => {
  return axiosInstance.put(`directores/${id}`, data);
};

export {
  getDirectors,
  createDirector,
  updateDirector
};