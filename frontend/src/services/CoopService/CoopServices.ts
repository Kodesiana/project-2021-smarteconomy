import instance from "@/utils/apiClient";
import { AxiosResponse } from "axios";
import { ParamsRequest } from "../QuestionaireServices/QuestionaireInterface";
import { transformRequest } from "../transformRequest";

const apiClient = instance({});

export default class CoopServices {
  static endPoint = {
    cooperation: "/cooperation",
  };

  static async postCooperation({
    expertName,
    villageId,
    data,
  }: {
    expertName: string;
    data: any;
    villageId: string;
  }): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append("expertName", expertName);
    formData.append("villageId", villageId);
    formData.append("file", data);

    return apiClient.post(`${this.endPoint.cooperation}`, formData);
  }

  static async getCooperationDropList(
    params: ParamsRequest
  ): Promise<AxiosResponse> {
    return apiClient.get(`${this.endPoint.cooperation}/droplist`, {
      params: transformRequest(params),
    });
  }

  static async getCooperation(params: ParamsRequest): Promise<AxiosResponse> {
    return apiClient.get(`${this.endPoint.cooperation}`, {
      params: transformRequest(params),
    });
  }

  static async getCoopDl(params: {
    villageId?: string;
  }): Promise<AxiosResponse> {
    const url = params.villageId
      ? `${this.endPoint.cooperation}/droplist?villageId=${params.villageId}`
      : `${this.endPoint.cooperation}/droplist`;
    return apiClient.get(url);
  }

  static async getCooperationById({
    kerjaSamaId,
  }: {
    kerjaSamaId: string;
  }): Promise<AxiosResponse> {
    return apiClient.get(`${this.endPoint.cooperation}/${kerjaSamaId}`);
  }

  // static async putCooperation({
  //     id,
  // }): Promise<AxiosResponse> {
  //     return apiClient.put(`${this.endPoint.cooperation}/${id}`, { name });
  // }

  static async deleteCooperation({
    id,
  }: {
    id: string;
  }): Promise<AxiosResponse> {
    return apiClient.delete(`${this.endPoint.cooperation}/${id}`);
  }
}
