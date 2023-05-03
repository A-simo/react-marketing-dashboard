import React from "react";
import avatar from "../assets/avatar.png";
import Tooltip from "./Tooltip";

export default function DashboardHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <Tooltip
          text="This dashboard presents various aspects of the data for a given
            period retrieved from the server."
        />
        <h1 className="text-4xl font-medium text-gray-500 ml-2">
          Partition data analytical dashboard
        </h1>
      </div>

      <a href="https://www.linkedin.com/in/alexander-shabanov/" target="blank">
        <img
          src={avatar}
          className="w-16 h-16 border-4 border-sky-400 rounded-full"
          alt="LinkedIn avatar"
        />
      </a>
    </div>
  );
}
