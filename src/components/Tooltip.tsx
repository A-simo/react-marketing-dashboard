import React from "react";

interface TooltipProps {
  text: string;
}

export default function Tooltip({ text }: TooltipProps) {
  return (
    <span className="tooltip">
      <span className="help_icon h-8 w-8 block"></span>
      <div className="tooltiptext leading-6">{text}</div>
    </span>
  );
}
