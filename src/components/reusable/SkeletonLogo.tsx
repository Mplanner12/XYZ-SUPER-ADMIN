import React from "react";

const SkeletonLogo: React.FC = () => {
  return (
    <div className="animate-pulse flex items-center">
      <div className="w-10 h-10 bg-foundation-grey-grey-700 rounded-full"></div>
      <div className="ml-2 w-20 h-6 bg-foundation-grey-grey-700 rounded"></div>
      {/* Add more shapes or text if your logo is more complex */}
    </div>
  );
};

export default SkeletonLogo;
