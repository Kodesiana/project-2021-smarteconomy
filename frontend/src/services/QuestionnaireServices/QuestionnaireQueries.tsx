import useQuery from "@/hooks/useQuery"
import { QuestionnairePublicRequest } from "./QuestionnaireInterfaces";
import QuestionnaireServices from "./QuestionnaireServices";

export const useGetQuestionnairePublicQuestion = () => {
  const { data, isFetching, status } = useQuery({
    key: ['getQuestionnairePublic'],
    fetchAction: async () => QuestionnaireServices.getQuestionnairePublicQuestion(),
    select: (e) => e?.data?.reduce((group: any, record: any) => {
      const { sectionName } = record;
      group[sectionName] = group[sectionName] ?? [];
      group[sectionName].push(record);
      return group;
    }, {})
  });

  return {
    data, isFetching, status
  }

}

export const useGetQuestionnaireAnswer = ({ id }: { id: string }) => {
  const { data, isFetching, status } = useQuery({
    key: ['getQuestionnaireAnswer'],
    fetchAction: async () => QuestionnaireServices.getQuestionnaireById(id),
    enabled: !!id,
    select: (data) => data?.data?.content ?? {}
  });

  return {
    data, isFetching, status
  }

}

export const useGetQuestionnairePublic = ({
  phone,
  villageId
}: QuestionnairePublicRequest) => {
  const { data, isFetching, status } = useQuery({
    key: ['GetQuestionnairePublic', villageId, phone],
    fetchAction: async () => QuestionnaireServices.getQuestionnairePublic({
      villageId,
      phone,
    }),
    select: (data) => data?.data ?? {},
    enabled: !!phone && !!villageId
  });

  return {
    data, isFetching, status
  }

}