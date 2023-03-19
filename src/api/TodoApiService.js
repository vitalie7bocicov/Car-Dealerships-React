import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5001",
});

export const getDealershipsApi = () => apiClient.get(`/dealerships`);

export const getDealershipApi = (id) => apiClient.get(`/dealerships/${id}`);

export const deleteDealershipApi = (id) =>
  apiClient.delete(`/dealerships/${id}`);

export const updateDealershipApi = (id, dealership) =>
  apiClient.put(`/dealerships/${id}`, dealership);

export const createDealershipApi = (dealership) =>
  apiClient.post(`/dealerships`, dealership);

export const getCarsApi = () => apiClient.get(`/cars`);

export const getCarsByDealershipApi = (id) =>
  apiClient.get(`/dealerships/${id}/cars`);

export const getCarApi = (id) => apiClient.get(`/cars/${id}`);

export const deleteCarApi = (id) => apiClient.delete(`/cars/${id}`);

export const updateCarApi = (id, car) => apiClient.put(`/cars/${id}`, car);

export const createCarApi = (car) => apiClient.post(`/cars`, car);
