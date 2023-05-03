import React from "react";

import usePartitionData from "./hooks/usePartitionData";

import LineChartSection from "./components/LineChart/LineChartSection";
import DashboardHeader from "./components/DashboardHeader";
import PieChartSection from "./components/PieChart/PieChartSection";
import RoasTableSection from "./components/RoasTable/RoasTableSection";

export default function App() {
  const partitionData = usePartitionData();

  return (
    <div className="App p-6 bg-gray-200 h-full flex flex-col overflow-auto">
      <DashboardHeader />
      <LineChartSection chartData={partitionData} />

      <div className=" grid grid-flow-col gap-4">
        <div className="col-span-3">
          <PieChartSection chartData={partitionData} />
        </div>
        <div className="col-span-2">
          <RoasTableSection chartData={partitionData} />
        </div>
      </div>
    </div>
  );
}
