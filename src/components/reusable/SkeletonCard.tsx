import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-foundation-black-black-500 p-6 rounded-lg shadow-lg animate-pulse">
      <div className="h-6 bg-foundation-grey-grey-700 rounded w-3/4 mb-4"></div>{" "}
      {/* Title */}
      <div className="space-y-3">
        <div className="h-4 bg-foundation-grey-grey-700 rounded w-5/6"></div>
        <div className="h-4 bg-foundation-grey-grey-700 rounded w-full"></div>
        <div className="h-4 bg-foundation-grey-grey-700 rounded w-4/5"></div>
        <div className="h-4 bg-foundation-grey-grey-700 rounded w-1/2 mt-4"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;

// You can create more specific skeleton loaders if needed, e.g., SkeletonProfile, SkeletonListItem, etc.
// For now, this generic card should work well for the business info display.
