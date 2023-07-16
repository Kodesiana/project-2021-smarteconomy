
export type QuestionnairePublicRequest = {
  villageId: string;
  phone: string;
};

export type QuestionnairePublicResponse = {
  sessionToken: string;
  data: any;
};
