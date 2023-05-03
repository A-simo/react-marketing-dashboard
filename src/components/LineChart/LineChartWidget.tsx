import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { SourceItem } from "../../lib";
import { LineChartDataUnit } from "../../utils";

interface LineChartWidgetProps {
  data: LineChartDataUnit[];
  sources: SourceItem[];
}

export default function LineChartWidget(props: LineChartWidgetProps) {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={1200}
          height={400}
          data={props.data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          {props.sources.map(
            (source) =>
              source.isActive && (
                <Line
                  type="monotone"
                  key={source.name}
                  dataKey={source.name}
                  stroke={source.color}
                />
              )
          )}

          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" minTickGap={64} />
          <YAxis />
          <Tooltip itemSorter={(a) => (a.value ? -a.value : -1)} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
