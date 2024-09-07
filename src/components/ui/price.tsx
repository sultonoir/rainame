import React from "react";

const Price = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <div className="rounded-sm border border-green-500 px-2 py-0.5 text-lg font-bold text-green-500">
      {children}
    </div>
  );
};

export default Price;
