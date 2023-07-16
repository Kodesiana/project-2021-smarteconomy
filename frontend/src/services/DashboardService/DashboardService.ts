import instance from "@/utils/apiClient";
import { parametersToObject, objectToParameters } from "@/utils/queryParams";
import { showNotification } from "@mantine/notifications";
import { AxiosError, AxiosResponse } from "axios";

const apiClient = instance({});

export default class DashboardServices {
  static endpoints = {
    summaries: '/dashboard/summaries',
    questionnaireChart: '/dashboard/questionnaire-chart',
    jobsChart: '/dashboard/jobs-chart',
    landOwnershipChart: '/dashboard/land-ownership-chart',
    expensesChart: '/dashboard/expenses-chart',
    motivationChart: '/dashboard/motivation-chart',
    tikChart: '/dashboard/tik-chart',
    informationChart: '/dashboard/information-chart',
    plsNNChart: '/dashboard/pls-nn-chart',
  }

  static async getSummaries(): Promise<AxiosResponse> {
    try {
      const response = await apiClient.get(this.endpoints.summaries);
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

  static async getQuestionnaireChart(): Promise<AxiosResponse> {
    try {
      const response = await apiClient.get(this.endpoints.questionnaireChart);
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

  static async getJobsChart(): Promise<AxiosResponse> {
    try {
      const response = await apiClient.get(this.endpoints.jobsChart);
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

  static async getLandOwnershipChart(): Promise<AxiosResponse> {
    try {
      const response = await apiClient.get(this.endpoints.landOwnershipChart);
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

  static async getExpensesChart(): Promise<AxiosResponse> {
    try {
      const response = await apiClient.get(this.endpoints.expensesChart);
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

  static async getMotivationChart(): Promise<AxiosResponse> {
    try {
      const response = await apiClient.get(this.endpoints.motivationChart);
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

  static async getTIKChart(): Promise<AxiosResponse> {
    try {
      const response = await apiClient.get(this.endpoints.tikChart);
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

  static async getInformationChart(): Promise<AxiosResponse> {
    try {
      const response = await apiClient.get(this.endpoints.informationChart);
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

  static async getPlsNNChart(): Promise<AxiosResponse> {
    try {
      const response = await apiClient.get(this.endpoints.plsNNChart);
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
}