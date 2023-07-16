export type SummarySchema = {
  villageCount: number
  answersCount: number
}

export type QuestionnaireChartSchema = {
    village_name: string
    count: number
}[];


export type JobsChartSchema = {
  village_name: string,
  tani: number,
  ternak: number,
  nelayan: number,
  pns: number,
  lainnya: number
}[];

export type LandOwnershipChartSchema = {
  village_name: string,
  milik_sendiri: number,
  parohan: number,
  lainnya: number
}[];

export type ExpensesChartSchema = {
    mapping: Record<string, string>;
    data: Record<string, number>[]
};

export type MotivationChartSchema = {
  village_name: string,
  tik: number,
  kerja_sama: number,
  pariwisata: number
}[]

export type TIKChartSchema = {
  village_name: string,
  lapangan_pekerjaan: number,
  penghasilan: number,
  memberdayakan_warga: number,
  mendatangkan_turis: number,
  akses_pasar: number,
  promosi_komoditas: number
}[]

export type InformationChartSchema = {
  village_name: string,
  aparat_desa: number,
  tokoh: number,
  pemda_kab: number,
  pemda_pusat: number,
  lainnya: number
}[]

export type PlsNNChartSchema = {
  village_name: string,
  rank_1: number,
  rank_2: number,
  rank_3: number,
}[]
