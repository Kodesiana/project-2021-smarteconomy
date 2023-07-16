import instance from "@/utils/apiClient";
import { AxiosResponse } from "axios";
import { transformRequest } from "../transformRequest";
import { VillagesIdRequest, VillagesNameRequest, VillagesParamsRequest } from "./VillagesInterface";

const apiClient = instance({});

export default class VillagesServices {
  static endPoint = {
    villages: "/villages",
    villagesDropList: "/villages/droplist",
  };

  static async postVillages({
    name,
  }: VillagesNameRequest): Promise<AxiosResponse> {
    return apiClient.post(this.endPoint.villages, { name });
  }

  static async getVillages(
    params: VillagesParamsRequest
  ): Promise<AxiosResponse> {
    return apiClient.get(this.endPoint.villages, { params: transformRequest(params) });
  }

  static async getVillagesById({
    id,
  }: VillagesIdRequest): Promise<AxiosResponse> {
    return apiClient.get(`${this.endPoint.villages}/${id}`);
  }

  static async putVillages({
    id,
    name,
  }: VillagesIdRequest & VillagesNameRequest): Promise<AxiosResponse> {
    return apiClient.put(`${this.endPoint.villages}/${id}`, { name });
  }

  static async deleteVillages({
    id,
  }: VillagesIdRequest): Promise<AxiosResponse> {
    return apiClient.delete(`${this.endPoint.villages}/${id}`);
  }

  static async getVillagesDropList(): Promise<AxiosResponse> {
    return apiClient.get(`${this.endPoint.villagesDropList}`);
  }
}
