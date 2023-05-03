export const sourceListNames = [
  "organicsearch",
  "direct",
  "paidsearch_brand",
  "baseline",
  "organicsocial",
  "google_performance",
  "paidsocial_retargeting",
  "display_prospecting",
  "radio",
  "display_retargeting",
  "paidsearch_generic_prospecting",
  "paidsearch_dynamic_search_ads_prospecting",
  "paidsocial_prospecting",
  "tv",
  "affiliate_prospecting",
] as const;

export interface PartitionData {
  date: string;
  source: (typeof sourceListNames)[number];
  attributed_conversions: number;
  attributed_revenue: number;
  type: "baseline" | "incrementality";
  spends: number;
  partition_id: string;
  optimisation_target: "conversions" | "revenue";
}
