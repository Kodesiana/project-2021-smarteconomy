import useQuery from "@/hooks/useQuery";

import Services from "./DashboardService";
import * as Schemas from "./DashboardInterface";

export const useGetSummaries = () => {
    return useQuery({
        key: ["dashboard", "summaries"],
        enabled: true,
        fetchAction: () => Services.getSummaries(),
        select: (data) => data?.data ?? {answersCount: 0, villageCount: 0} as Schemas.SummarySchema,
        placeholderData: {answersCount: 0, villageCount: 0} as Schemas.SummarySchema,
    });
}

export const useQuestionnaireChart = () => {
  return useQuery({
      key: ["dashboard", "questionnaire"],
      enabled: true,
      fetchAction: () => Services.getQuestionnaireChart(),
      select: (data) => data?.data ?? [] as Schemas.QuestionnaireChartSchema,
      placeholderData: [] as Schemas.QuestionnaireChartSchema,
  });
}

export const useJobsChart = () => {
  return useQuery({
      key: ["dashboard", "jobs"],
      enabled: true,
      fetchAction: () => Services.getJobsChart(),
      select: (data) => data?.data ?? [] as Schemas.JobsChartSchema,
      placeholderData: [] as Schemas.JobsChartSchema,
  });
}

export const useLandOwnershipChart = () => {
  return useQuery({
      key: ["dashboard", "land-ownership"],
      enabled: true,
      fetchAction: () => Services.getLandOwnershipChart(),
      select: (data) => data?.data ?? [] as Schemas.LandOwnershipChartSchema,
      placeholderData: [] as Schemas.LandOwnershipChartSchema,
  });
}

export const useExpensesChart = () => {
  return useQuery({
      key: ["dashboard", "expenses"],
      enabled: true,
      fetchAction: () => Services.getExpensesChart(),
      select: (data) => data?.data ?? {} as Schemas.ExpensesChartSchema,
      placeholderData: {} as Schemas.ExpensesChartSchema,
  });
}

export const useMotivationChart = () => {
  return useQuery({
      key: ["dashboard", "motivation"],
      enabled: true,
      fetchAction: () => Services.getMotivationChart(),
      select: (data) => data?.data ?? [] as Schemas.MotivationChartSchema,
      placeholderData: [] as Schemas.MotivationChartSchema,
  });
}

export const useTIKChart = () => {
  return useQuery({
      key: ["dashboard", "tik"],
      enabled: true,
      fetchAction: () => Services.getTIKChart(),
      select: (data) => data?.data ?? [] as Schemas.TIKChartSchema,
      placeholderData: [] as Schemas.TIKChartSchema,
  });
}

export const useInformationChart = () => {
  return useQuery({
      key: ["dashboard", "information"],
      enabled: true,
      fetchAction: () => Services.getInformationChart(),
      select: (data) => data?.data ?? [] as Schemas.InformationChartSchema,
      placeholderData: [] as Schemas.InformationChartSchema,
  });
}

export const usePlsNNChart = () => {
  return useQuery({
      key: ["dashboard", "pls-nn"],
      enabled: true,
      fetchAction: () => Services.getPlsNNChart(),
      select: (data) => data?.data ?? [] as Schemas.PlsNNChartSchema,
      placeholderData: [] as Schemas.PlsNNChartSchema,
  });
}
