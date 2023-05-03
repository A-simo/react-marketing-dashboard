import React, { useMemo, useState } from "react";
import { SourceItem, indicatorsList, sourceList } from "../../lib";
import { mapToLineChartData, sourceFormatter } from "../../utils";
import { PartitionDataType } from "../../hooks/usePartitionData";
import LineChartWidget from "./LineChartWidget";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import Tooltip from "../Tooltip";

interface LineChartSectionProps {
  chartData: PartitionDataType;
}

export default function LineChartSection(props: LineChartSectionProps) {
  const mappedLineChartData = useMemo(
    () => mapToLineChartData(props.chartData.data),
    [props.chartData.data]
  );

  const [activeLineChart, setActiveLineChart] = useState<
    "revenueData" | "conversionsData" | "spendsData"
  >("revenueData");
  const [sourceListState, setSourceListState] = useState(sourceList);

  const dataIsReady =
    !props.chartData.isLoading &&
    props.chartData.data !== null &&
    props.chartData.data.length > 0;

  function checkboxChangeHandler(
    isChecked: boolean,
    currentSource: SourceItem
  ) {
    setSourceListState((prevListState) =>
      prevListState.map((stateSource) => {
        if (stateSource.name === currentSource.name) {
          return {
            ...stateSource,
            isActive: isChecked,
          };
        } else {
          return stateSource;
        }
      })
    );
  }

  return (
    <section className="bg-white p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center pb-4 border-b mb-4 h-[60px]">
        <div className=" flex items-center">
          <Tooltip
            text="The line chart shows the dynamics of the various indicators
            (revenue, conversion, spends) by source. This chart also
            provides an indication of the ratio of the different sources
            within individual days."
          />
          <h3 className="font-medium text-2xl text-gray-500 ml-2">
            Distribution of indicators by source over time
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <p>Select indicator:</p>
          <div className="flex bg-gray-200 rounded-lg  p-1">
            <button
              className={`${
                activeLineChart === "revenueData" && "bg-white"
              } py-1 px-3 bg-gray-200 rounded`}
              onClick={() => setActiveLineChart("revenueData")}
            >
              {indicatorsList.revenueData}
            </button>
            <button
              className={`${
                activeLineChart === "conversionsData" && "bg-white"
              } py-1 px-3 bg-gray-200 rounded`}
              onClick={() => setActiveLineChart("conversionsData")}
            >
              {indicatorsList.conversionsData}
            </button>
            <button
              className={`${
                activeLineChart === "spendsData" && "bg-white"
              } py-1 px-3 bg-gray-200 rounded`}
              onClick={() => setActiveLineChart("spendsData")}
            >
              {indicatorsList.spendsData}
            </button>
          </div>
        </div>
      </div>

      {dataIsReady && (
        <div className="flex">
          <div>
            <div className="flex flex-col items-baseline gap-2 pb-4 border-b mb-4">
              <p className="font-medium mb-2">Baseline sources:</p>
              <div className="flex flex-col items-baseline gap-2 flex-nowrap">
                {sourceListState.map(
                  (currentSource) =>
                    currentSource.type === "baseline" && (
                      <label
                        className="container"
                        key={`checkbox-${currentSource.name}`}
                      >
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          checked={currentSource.isActive}
                          onChange={(e) =>
                            checkboxChangeHandler(
                              e.target.checked,
                              currentSource
                            )
                          }
                          className="absolute opacity-0 cursor-pointer h-0 w-0 peer"
                        />

                        <span className="checkmark" />
                        <span className="whitespace-nowrap">
                          {sourceFormatter(currentSource.name)}
                        </span>
                      </label>
                    )
                )}
              </div>
            </div>

            <div className="flex flex-col items-baseline gap-2">
              <p className="font-medium mb-2">Incrementality sources</p>
              {sourceListState.map(
                (currentSource) =>
                  currentSource.type === "incrementality" && (
                    <label
                      className="container"
                      key={`checkbox-${currentSource.name}`}
                    >
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={currentSource.isActive}
                        onChange={(e) =>
                          checkboxChangeHandler(e.target.checked, currentSource)
                        }
                        className="absolute opacity-0 cursor-pointer h-0 w-0 peer"
                      />

                      <span className="checkmark" />
                      <span className="whitespace-nowrap">
                        {sourceFormatter(currentSource.name)}
                      </span>
                    </label>
                  )
              )}
            </div>
          </div>
          <div className=" w-full">
            <LineChartWidget
              data={mappedLineChartData[activeLineChart]}
              sources={sourceListState}
            />
          </div>
        </div>
      )}
      {props.chartData.isLoading && <Loader />}
      {props.chartData.error && (
        <ErrorMessage errorProp={props.chartData.error} />
      )}
    </section>
  );
}
