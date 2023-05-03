import React, { useMemo } from "react";
import { PartitionDataType } from "../../hooks/usePartitionData";
import RoasWidget from "./RoasWidget";
import { mapToPieChartData, mapToRoasTableData } from "../../utils";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import Tooltip from "../Tooltip";

interface RoasTableSectionProps {
  chartData: PartitionDataType;
}
export default function RoasTableSection(props: RoasTableSectionProps) {
  const dataIsReady =
    !props.chartData.isLoading &&
    props.chartData.data !== null &&
    props.chartData.data.length > 0;

  const mappedPieChartData = useMemo(
    () => mapToPieChartData(props.chartData.data),
    [props.chartData.data]
  );

  const mappedRoasTableData = useMemo(
    () => mapToRoasTableData(mappedPieChartData),
    [mappedPieChartData]
  );
  return (
    <section className="bg-white p-4 rounded-lg mb-4 h-full">
      <div className="flex justify-between items-center pb-4 border-b mb-4 h-[60px]">
        <div className=" flex items-center">
          <Tooltip
            text="Ranking of sources based on the ROAS indicator calculated over
            the whole period for sources that had non-zero spends. ROAS
            scores less than 1 are marked in, as this indicates
            that spends have exceeded revenue."
          />
          <h3 className="font-medium text-2xl text-gray-500 ml-2">
            ROAS (Return On Ad Spend) by sources with spends{" "}
          </h3>
        </div>
      </div>
      {dataIsReady && <RoasWidget data={mappedRoasTableData} />}
      {props.chartData.isLoading && <Loader />}
      {props.chartData.error && (
        <ErrorMessage errorProp={props.chartData.error} />
      )}
    </section>
  );
}
