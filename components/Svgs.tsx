import React from "react";

interface SvgsProps {
  className: string;
  d: string;
}

const Svgs: React.FC<SvgsProps> = ({ className, d }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
};

export default Svgs;
