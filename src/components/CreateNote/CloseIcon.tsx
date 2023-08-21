import React from "react";

type CloseIconProps = {
  size?: number;
  strokeWidth?: number;
  width?: number;
  height?: number;
};

export const CloseIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
}: CloseIconProps) => {
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
      className="feather feather-x-square"
      viewBox="0 0 24 24"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
      <path d="M9 9L15 15"></path>
      <path d="M15 9L9 15"></path>
    </svg>
  );
};
