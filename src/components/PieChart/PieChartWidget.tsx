import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import { SourceItem } from "../../lib";

import {
  PieChartDataUnit,
  numberFormatter,
  sourceFormatter,
} from "../../utils";

interface PieChartWidgetProps {
  sources: SourceItem[];
  data: PieChartDataUnit[];
}

export default function PieChartWidget(props: PieChartWidgetProps) {
  const renderColorfulLegendText = (value: string, entry: any) => {
    const { color, payload } = entry;

    return (
      <span style={{ color }}>
        {numberFormatter.format(payload.value)}: {sourceFormatter(value)}
      </span>
    );
  };

  return (
    <>
      <PieChart width={1000} height={400}>
        <Pie
          data={props.data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={160}
          innerRadius={100}
          fill="#8884d8"
        >
          {props.sources.map((source) => (
            <Cell key={`cell-${source.name}`} fill={source.color} />
          ))}
        </Pie>
        <text
          x={290}
          y={185}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-medium text-xl fill-gray-500"
        >
          Total:
        </text>
        <text x={290} y={215} textAnchor="middle" dominantBaseline="middle">
          {numberFormatter.format(
            props.data.reduce((sum, current) => sum + current.value, 0)
          )}
        </text>
        <Tooltip />
        <Legend
          verticalAlign="top"
          align="right"
          layout="vertical"
          height={36}
          formatter={renderColorfulLegendText}
        />
      </PieChart>
    </>
  );
}
