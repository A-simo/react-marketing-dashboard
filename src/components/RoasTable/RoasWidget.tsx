import React from "react";
import { ResultTable, numberFormatter, sourceFormatter } from "../../utils";

interface RoasWidgetProps {
  data: ResultTable[];
}

export default function RoasWidget(props: RoasWidgetProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <td className="p-2 font-medium">Sourse</td>
          <td className="text-right p-2 font-medium">Revenue</td>
          <td className="text-right p-2 font-medium">Spends</td>
          <td className="text-right p-2 font-medium">ROAS</td>
        </tr>
      </thead>
      <tbody>
        {props.data.map((row) => (
          <tr
            className="border-b last:border-b-0 hover:bg-gray-50"
            key={`tr-${row.source}`}
          >
            <td className="p-2">{sourceFormatter(row.source)}</td>
            <td className="p-2 text-right">
              {numberFormatter.format(row.revenue)}
            </td>
            <td className="p-2 text-right">
              {numberFormatter.format(row.spends)}
            </td>
            <td
              className="p-2 text-right"
              style={{ color: row.roas < 1 ? "red" : "green" }}
            >
              {numberFormatter.format(row.roas)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
