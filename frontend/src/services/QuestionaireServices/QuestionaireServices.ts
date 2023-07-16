import instance from "@/utils/apiClient";
import { AxiosResponse } from "axios";
import { IdRequest, QuestionaireParams, ParamsRequest } from "./QuestionaireInterface";

const apiClient = instance({});

export default class QuestionaireServices {
    static endPoint = {
        questionaire: "/questionaire",
        questionairePublic: "/questionaire/public",
    };

    static async postQuestionaire(params: QuestionaireParams): Promise<AxiosResponse> {
        return apiClient.post(this.endPoint.questionaire, { params });
    }

    static async getQuestionaire(
        params: ParamsRequest
    ): Promise<AxiosResponse> {
        return apiClient.get(this.endPoint.questionaire, { params });
    }

    static async getQuestionaireById({
        id,
    }: IdRequest): Promise<AxiosResponse> {
        return apiClient.get(`${this.endPoint.questionaire}/${id}`);
    }

    static async putQuestionaire({
        id,
        ...params
    }: IdRequest & QuestionaireParams): Promise<AxiosResponse> {
        return apiClient.put(`${this.endPoint.questionaire}/${id}`, { params });
    }

    static async deleteQuestionaire({
        id,
    }: IdRequest): Promise<AxiosResponse> {
        return apiClient.delete(`${this.endPoint.questionaire}/${id}`);
    }

}
