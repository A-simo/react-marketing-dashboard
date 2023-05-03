import React, { useMemo, useState } from "react";
import { sourceList, indicatorsList } from "../../lib";
import { PartitionDataType } from "../../hooks/usePartitionData";
import PieChartWidget from "./PieChartWidget";
import { mapToPieChartData } from "../../utils";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import Tooltip from "../Tooltip";

interface LineChartSectionProps {
  chartData: PartitionDataType;
}

export default function PieChartSection(props: LineChartSectionProps) {
  const mappedPieChartData = useMemo(
    () => mapToPieChartData(props.chartData.data),
    [props.chartData.data]
  );
  const [activePieChart, setActivePieChart] = useState<
    "revenueData" | "spendsData"
  >("revenueData");

  const dataIsReady =
    !props.chartData.isLoading &&
    props.chartData.data !== null &&
    props.chartData.data.length > 0;
  return (
    <section className="bg-white p-4 rounded-lg mb-4 h-full">
      <div className="flex justify-between items-center pb-4 border-b mb-4 h-[60px]">
        <div className=" flex items-center">
          <Tooltip
            text="The pie chart shows the proportion of sources for the whole
            period by revenue and spends per selection."
          />
          <h3 className="font-medium text-2xl text-gray-500 ml-2">
            Distribution of indicator shares by source
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <p>Select indicator:</p>
          <div className="flex bg-gray-200 rounded-lg  p-1">
            <button
              className={`${
                activePieChart === "revenueData" && "bg-white"
              } py-1 px-3 bg-gray-200 rounded`}
              onClick={() => setActivePieChart("revenueData")}
            >
              {indicatorsList.revenueData}
            </button>
            <button
              className={`${
                activePieChart === "spendsData" && "bg-white"
              } py-1 px-3 bg-gray-200 rounded`}
              onClick={() => setActivePieChart("spendsData")}
            >
              {indicatorsList.spendsData}
            </button>
          </div>
        </div>
      </div>
      {dataIsReady && (
        <div className="flex flex-col items-center">
          <PieChartWidget
            data={mappedPieChartData[activePieChart]}
            sources={sourceList}
          />
        </div>
      )}
      {props.chartData.isLoading && <Loader />}
      {props.chartData.error && (
        <ErrorMessage errorProp={props.chartData.error} />
      )}
    </section>
  );
}
