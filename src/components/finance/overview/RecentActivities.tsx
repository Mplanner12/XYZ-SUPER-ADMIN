import React from 'react';


const RecentActivities: React.FC = () => {
  const activities = [
    "New Journal Entry Created",
    "New Accounts Updates",
    "New Accounts Updates",
    "Pending Journal Approval",
    "Pending Journal Approval",
    "New Journal Entry Created",
  ];

  return (
      <div className="flex flex-col justify-center items-center bg-white rounded-2xl w-full md:w-[33%] h-[400px] shadow-custom px-6 py-8">
        <div className="flex flex-col w-full">
          <div className="gap-2 self-start text-base text-neutral-700 mb-6">Recent Activities</div>
          {activities.map((activity, index, arr) => (
            <React.Fragment key={index}>
              <div className="flex gap-10 justify-between items-start max-w-full w-[255px]">
                <div className="text-[#939292]">{activity}</div>
                <div className="text-primary-normal cursor-pointer">View</div>
              </div>
              {index !==arr.length-1 && (
                <div className='border border-solid border-[#F0F0F0] my-4'/>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
  );
};

export default RecentActivities;