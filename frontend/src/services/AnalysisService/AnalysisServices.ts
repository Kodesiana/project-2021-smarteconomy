import instance from "@/utils/apiClient";
import { parametersToObject, objectToParameters } from "@/utils/queryParams";
import { showNotification } from "@mantine/notifications";
import { AxiosError, AxiosResponse } from "axios";
import { DeviceTablet } from "phosphor-react";
import { CSParam } from "./AnalysisInterface";

const apiClient = instance({});

export default class AnalysisServices {
  static endPoint = {
    analysis: "/analysis",
    citizenScience: "/analysis/citizen_science",
    cooperation: "/analysis/cooperation",
    spatialScore: "/analysis/spatial_score",
    backfill: "/analysis/backfill",
    dashboard: "/analysis/dashboard",
    recommendation: "/analysis/recommendation/quartile",
    recommendationIME: "/analysis/recommendation/ime",
  };

  static async getCitizenScience(params: CSParam): Promise<AxiosResponse> {
    try {
      const response = await apiClient.post(this.endPoint.citizenScience, {
        ...params,
      });
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        showNotification({
          title: "Error",
          message: error.message,
          color: "red",
        });
      }
      return Promise.reject(error);
    }
  }

  static async getCooperation(params: {
    kerjaSamaId?: string;
    villageId?: string;
    detail?: string;
  }): Promise<AxiosResponse> {
    const payload = {};
    if (params.detail === "villageId") {
      Object.assign(payload, {villageId: params.villageId});
    } else if (params.detail === "kerjaSamaId") {
      Object.assign(payload, {kerjaSamaId: params.kerjaSamaId});
    }
    
    return apiClient.post(
      this.endPoint.cooperation,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  static async getSpatialScore(params: {
    villageId: string;
  }): Promise<AxiosResponse> {
    return apiClient.post(this.endPoint.spatialScore, { ...params });
  }

  static async getBackfill(params: {
    type: "citizen_science" | "infrastructure";
    id?: string;
  }): Promise<AxiosResponse> {
    return apiClient.post(this.endPoint.backfill, { ...params });
  }

  static async getDashboard(): Promise<AxiosResponse> {
    return apiClient.post(this.endPoint.dashboard);
  }

  static async getRecommendation({ villageId }: { villageId: string }): Promise<AxiosResponse> {
    return apiClient.post(this.endPoint.recommendation, { villageId });
  }

  static async getRecommendationIME({ villageId }: { villageId: string }): Promise<AxiosResponse> {
    return apiClient.post(this.endPoint.recommendationIME, { villageId });
  }
}
