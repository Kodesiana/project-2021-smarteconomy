import instance from '@/utils/apiClient';
import { AxiosResponse } from "axios";
import { SearchRequest, UserProps } from "./interface";
import { ParamsRequest } from './QuestionaireServices/QuestionaireInterface';
import { transformRequest } from './transformRequest';

const apiClient = instance({});

export default class DataServices {
  static endPoint = {
    graph: {
      search: "/graph/search",
      analyze: "/graph/analyze",
    },
    persons: "/persons",
    detailConnection: {
      persons: "/persons",
      "history-lab-covid": "/covid-tests",
      "phone-activity": "phone-activities",
      "sms-activity": "sms-gateway",
      dpo: "dpo",
      tweets: "tweets",
    },
    quesionare: {
      public: "/questionaire/public/questions",
    },
    analysis: "/analysis",
    users: "/users",
    infra: "/infrastructure",
    coop: "/cooperation",
    investasi: "/investment"
  };

  static async getGraphSearch(params: SearchRequest): Promise<AxiosResponse> {
    return apiClient.get(this.endPoint.graph.search, { params });
  }

  static async getGraphAnalyze({
    depth,
    nik,
  }: {
    depth: number;
    nik: string;
  }): Promise<AxiosResponse> {
    return apiClient.get(`${this.endPoint.graph.analyze}/${nik}`, {
      params: { depth },
    });
  }

  static async getPersons(params: SearchRequest): Promise<AxiosResponse> {
    return apiClient.get(`${this.endPoint.persons}`, { params: transformRequest(params) });
  }

  static async getUsers(params: SearchRequest): Promise<AxiosResponse> {
    return apiClient.get(`${this.endPoint.users}`, {
      params: {
        ...transformRequest(params),
      },
    });
  }

  static async postUsers(payload: UserProps): Promise<AxiosResponse> {
    return apiClient.post(`${this.endPoint.users}`, payload);
  }

  static async putUsers({
    id,
    password,
    ...payload
  }: UserProps): Promise<AxiosResponse> {
    return apiClient.put(`${this.endPoint.users}/${id}`, { id, ...payload });
  }

  static async deleteUsers({ id }: UserProps): Promise<AxiosResponse> {
    return apiClient.delete(`${this.endPoint.users}/${id}`);
  }

  static async putUsersPassword({ id, ...payload }: UserProps): Promise<AxiosResponse> {
    return apiClient.put(`${this.endPoint.users}/password/${id}`, payload);
  }

  static async getDashboard(): Promise<AxiosResponse> {
    return apiClient.get(`${this.endPoint.analysis}/dashboard`);
  }

  static async getInfra(params: ParamsRequest): Promise<AxiosResponse> {
    return apiClient.get(`${this.endPoint.infra}`, { params: transformRequest(params) });
  }

  static async getInvestasi(params: SearchRequest): Promise<AxiosResponse> {
    return apiClient.get(`${this.endPoint.investasi}`, { params: transformRequest(params) });
  }

  static async putInvestasi(id: string, payload: any): Promise<AxiosResponse> {
    return apiClient.put(`${this.endPoint.investasi}/${id}`, payload);
  }
}

