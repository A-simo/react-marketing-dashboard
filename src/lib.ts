import { sourceListNames } from "./types";

export interface SourceItem {
  name: (typeof sourceListNames)[number];
  color: string;
  isActive: boolean;
  type: "baseline" | "incrementality";
}

export const sourceList: SourceItem[] = [
  { name: "organicsearch", color: "#d32f2f", isActive: true, type: "baseline" },
  { name: "direct", color: "#c2185b", isActive: true, type: "baseline" },
  {
    name: "paidsearch_brand",
    color: "#7b1fa2",
    isActive: true,
    type: "baseline",
  },
  { name: "baseline", color: "#512da8", isActive: true, type: "baseline" },
  { name: "organicsocial", color: "#303f9f", isActive: true, type: "baseline" },
  {
    name: "google_performance",
    color: "#1976d2",
    isActive: true,
    type: "incrementality",
  },
  {
    name: "paidsocial_retargeting",
    color: "#0288d1",
    isActive: true,
    type: "incrementality",
  },
  {
    name: "display_prospecting",
    color: "#0097a7",
    isActive: true,
    type: "incrementality",
  },
  { name: "radio", color: "#00796b", isActive: true, type: "incrementality" },
  {
    name: "paidsearch_generic_prospecting",
    color: "#388e3c",
    isActive: true,
    type: "incrementality",
  },
  {
    name: "paidsearch_dynamic_search_ads_prospecting",
    color: "#689f38",
    isActive: true,
    type: "incrementality",
  },
  {
    name: "paidsocial_prospecting",
    color: "#afb42b",
    isActive: true,
    type: "incrementality",
  },
  { name: "tv", color: "#fbc02d", isActive: true, type: "incrementality" },
  {
    name: "affiliate_prospecting",
    color: "#ffa000",
    isActive: true,
    type: "incrementality",
  },
  {
    name: "display_retargeting",
    color: "#f57c00",
    isActive: true,
    type: "incrementality",
  },
];

export const indicatorsList = {
  revenueData: "Revenue",
  conversionsData: "Conversions",
  spendsData: "Spends",
};
