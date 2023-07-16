import instance from '@/utils/apiClient'
import { AxiosResponse } from "axios";
import { LoginRequest } from "./auth.interface";

const apiClient = instance({});

export default class AuthServices {

  static endPoint = {
    login: "/auth/login",
    refresh: "/auth/refresh"
  }

  static async postLogin(payload: LoginRequest): Promise<AxiosResponse> {
    return apiClient.post(this.endPoint.login,payload);
  }

  static async postRefresh(payload: LoginRequest): Promise<AxiosResponse> {
    return apiClient.post(this.endPoint.refresh,payload);
  }
}
