import React from 'react';

interface TableSkeletonProps {
  columns: number;
  rows: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ columns, rows }) => {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 mb-4 rounded"></div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex mb-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-8 bg-[#cacaca] rounded mr-2 flex-1"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;