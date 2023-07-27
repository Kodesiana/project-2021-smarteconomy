
import useQuery from "@/hooks/useQuery";
import { CSParam } from "./AnalysisInterface";
import AnalysisServices from "./AnalysisServices";
import QuestionaireServices from "./AnalysisServices";
export const useGetCitizenScienceData = ({ enabled, ...params }: CSParam,) => {
  return useQuery({
    key: ["citizenScience", params],
    enabled,
    fetchAction: () => QuestionaireServices.getCitizenScience(params),
    select: (data) => data?.data ?? {},
    placeholderData: {},

  });
};

export const useGetAnalysisCoop = (params: { kerjaSamaId?: string; villageId?: string, detail: string; }, enabled = false) => {
  return useQuery({
    key: ["getAnalysisCoop", params],
    enabled,
    fetchAction: () => QuestionaireServices.getCooperation(params),
    select: (data) => {
      const { alternatives, factors, cr } = data?.data ?? [];
      return { alternatives, factors, cr: cr };
    },
    placeholderData: {
      cr: 0,
      alternatives: {},
      factors: {},
    },
  });
};
interface Item {
  code: string;
  variable: string;
  value: number;
  text?: string;
}

interface Recommendations {
  [variable: string]: string;
}

interface ParserOutput {
  threshold: number;
  values: Record<string, number>;
  recommendations: Recommendations;
}

export const useGetRecommendation = (
  { villageId }: { villageId: string; },
  enabled = false
) => {
  return useQuery({
    key: ["getRecommendation", "quartile", villageId],
    enabled: !!villageId || enabled,
    fetchAction: () => AnalysisServices.getRecommendation({ villageId }),
    select: (data) => {

      const values: Array<Item> = [];
      const recommendations: Array<string> = [];

      data?.data?.items.forEach(({ text, ...valueItem }: Item) => {
        values.push(valueItem); 
        recommendations.push(text ?? ""); 
      });
      return {  rank: data?.data?.rank, threshold: data?.data?.threshold, values, recommendations, description: data?.data?.description };
    },
    placeholderData: {
      threshold: 0, values: {}, recommendations: []
    },
  });
};

export const useGetRecommendationIME = (
  { villageId }: { villageId: string; },
  enabled = false
) => {
  return useQuery({
    key: ["getRecommendation", "ime", villageId],
    enabled: !!villageId || enabled,
    fetchAction: () => AnalysisServices.getRecommendationIME({ villageId }),
    select: (data) => {
     
      const values: Array<Item> = [];
      const recommendations: Array<string> = [];

      data?.data?.items.forEach(({ text, ...valueItem }: Item) => {
        values.push(valueItem); 
        recommendations.push(text ?? ""); 
      });
      return { rank: data?.data?.rank, threshold: data?.data?.threshold, values, recommendations };
    },
    placeholderData: {
      threshold: 0, values: {}, recommendations: []
    },
  });
};