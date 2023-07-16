import { showNotification } from "@mantine/notifications";
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
const client = ({
  baseURL = import.meta.env.VITE_API_URL as string,
  ...options
}: AxiosRequestConfig) => {
  const instance = axios.create({
    baseURL,
    ...options,
  });

  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        ...config.headers,
      };
      return config;
    }
    config.headers = {
      Authorization: `Basic ${btoa(import.meta.env.VITE_BASIC_AUTH)}`,
      ...config.headers,
    };
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    ({ response }: AxiosError) => {
      if (response && response.status === 401) {
        localStorage.clear();
        window.dispatchEvent(new Event("storage"));
        showNotification({
          title: "Sesi Telah Berakhir",
          message: "Harap Login Kembali",
          color: "yellow",
        });
      }
      return Promise.reject(response);
    }
  );
  return instance;
};

export default client;
