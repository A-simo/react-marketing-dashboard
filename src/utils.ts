import { PartitionData } from "./types";
import { sourceListNames } from "./types";

export type LineChartDataUnit = Record<string, string | number>;
interface MapToLineChartDataType {
  revenueData: LineChartDataUnit[];
  conversionsData: LineChartDataUnit[];
  spendsData: LineChartDataUnit[];
}
function mapToLineChartData(
  data: PartitionData[] | null
): MapToLineChartDataType {
  const revenueData: LineChartDataUnit[] = [];
  const conversionsData: LineChartDataUnit[] = [];
  const spendsData: LineChartDataUnit[] = [];
  data?.forEach((item) => {
    if (revenueData.length === 0) {
      revenueData.push({
        date: item.date,
        [`${item.source}`]: item.attributed_revenue,
      });
      conversionsData.push({
        date: item.date,
        [`${item.source}`]: item.attributed_conversions,
      });
      spendsData.push({
        date: item.date,
        [`${item.source}`]: item.spends,
      });
    }

    if (revenueData.at(-1)?.date === item.date) {
      // used type assetions as I am sure that data index is not empty. js api has a blind spot for ts there.
      (revenueData.at(-1) as LineChartDataUnit)[`${item.source}`] =
        item.attributed_revenue;
      (conversionsData.at(-1) as LineChartDataUnit)[`${item.source}`] =
        item.attributed_conversions;
      (spendsData.at(-1) as LineChartDataUnit)[`${item.source}`] = item.spends;
    } else {
      revenueData.push({
        date: item.date,
        [`${item.source}`]: item.attributed_revenue,
      });
      conversionsData.push({
        date: item.date,
        [`${item.source}`]: item.attributed_conversions,
      });
      spendsData.push({
        date: item.date,
        [`${item.source}`]: item.spends,
      });
    }
  });

  return { revenueData, conversionsData, spendsData };
}

export interface PieChartDataUnit {
  value: number;
  name: (typeof sourceListNames)[number];
}

export interface MapToPieChartDataType {
  revenueData: PieChartDataUnit[];
  spendsData: PieChartDataUnit[];
}

function mapToPieChartData(
  data: PartitionData[] | null
): MapToPieChartDataType {
  const revenueData: PieChartDataUnit[] = [];
  const spendsData: PieChartDataUnit[] = [];

  sourceListNames.forEach((source) => {
    revenueData.push({ value: 0, name: source });
    spendsData.push({ value: 0, name: source });
  });

  data?.forEach((item) => {
    const foundRevenue = revenueData.find(
      (source) => source.name === item.source
    );
    if (foundRevenue) foundRevenue.value += item.attributed_revenue;

    const foundSpends = spendsData.find(
      (source) => source.name === item.source
    );
    if (foundSpends) foundSpends.value += item.spends;
  });

  return { revenueData, spendsData };
}

export interface ResultTable {
  source: string;
  spends: number;
  revenue: number;
  roas: number;
}

function mapToRoasTableData(data: MapToPieChartDataType) {
  const resultTable: ResultTable[] = [];
  const spends = data.spendsData;
  const revenues = data.revenueData;

  spends.forEach((currentSpend) => {
    if (currentSpend.value > 0) {
      const curentSourceRevenue = revenues.find(
        (revenueItem) => revenueItem.name === currentSpend.name
      );
      resultTable.push({
        source: currentSpend.name,
        spends: currentSpend.value,
        revenue: curentSourceRevenue ? curentSourceRevenue?.value : 0,
        roas: curentSourceRevenue
          ? curentSourceRevenue?.value / currentSpend.value
          : 0,
      });
    }
  });

  resultTable.sort((a, b) => b.roas - a.roas);
  return resultTable;
}

const numberFormatter = new Intl.NumberFormat("de-DE", {
  maximumFractionDigits: 2,
});

const sourceFormatter = (string: string) => {
  string = string[0].toUpperCase() + string.substring(1);
  string = string.split("_").join(" ");
  return string;
};

export {
  mapToLineChartData,
  mapToPieChartData,
  mapToRoasTableData,
  numberFormatter,
  sourceFormatter,
};
