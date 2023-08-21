import React from "react";

type CheckIconProps = {
  size?: number;
  strokeWidth?: number;
  width?: number;
  height?: number;
};

export const CheckIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
}: CheckIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      className="feather feather-check-square"
      viewBox="0 0 24 24"
    >
      <path d="M9 11L12 14 22 4"></path>
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
    </svg>
  );
};
