import instance from "@/utils/apiClient";
import { AxiosResponse } from "axios";
import { transformRequest } from "../transformRequest";
import { QuestionnairePublicRequest } from "./QuestionnaireInterfaces";

const apiClient = instance({});

export default class QuestionnaireServices {
  static endPoint = {
    questionnaire: "/questionaire",
    questionnairePublic: "/questionaire/public",
  };

  static async postQuestionnaire(payload: any): Promise<AxiosResponse> {
    return apiClient.post(this.endPoint.questionnaire, payload);
  }

  static async getQuestionnaire(payload: any): Promise<AxiosResponse> {
    return apiClient.get(this.endPoint.questionnaire, payload);
  }

  static async getQuestionnaireById(id: string): Promise<AxiosResponse> {
    return apiClient.get(`${this.endPoint.questionnaire}/${id}`);
  }

  static async putQuestionnaire(
    id: string,
    payload: any
  ): Promise<AxiosResponse> {
    return apiClient.put(`${this.endPoint.questionnaire}/${id}`, payload);
  }

  static async deleteQuestionnaire(id: string): Promise<AxiosResponse> {
    return apiClient.delete(`${this.endPoint.questionnaire}/${id}`);
  }

  static async getQuestionnairePublic(
    params: QuestionnairePublicRequest
  ): Promise<AxiosResponse> {
    return apiClient.get(`${this.endPoint.questionnairePublic}`, {
      params: transformRequest(params),
    });
  }

  static async putQuestionnairePublic(payload: any): Promise<AxiosResponse> {
    return apiClient.put(`${this.endPoint.questionnairePublic}`, payload);
  }

  static async postQuestionnairePublic(payload: any): Promise<AxiosResponse> {
    return apiClient.post(`${this.endPoint.questionnairePublic}`, payload);
  }

  static async getQuestionnairePublicQuestion(): Promise<AxiosResponse> {
    return apiClient.get(`${this.endPoint.questionnairePublic}/questions`, {
      headers: {
        Authorization: `Basic ${btoa("project-se:32d9Y#3h$MDagJ")}`,
      },
    });
  }
}
