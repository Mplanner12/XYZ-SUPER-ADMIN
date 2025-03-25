import Image, { StaticImageData } from 'next/image';

interface Activity {
	description: {
    text: string;
    icon: string | StaticImageData;
  };
	view: string;
}

const activities: Activity[] = [
	{
		description: {
			text: 'New Journal Entry Created',
			icon: '/cash-multiple.png',
		},
		view: '#',
	},
	{
		description: {
			text: 'New Journal Entry Created',
			icon: '/cash-multiple.png',
		},
		view: '#',
	},
	{
		description: {
			text: 'New Journal Entry Created',
			icon: '/cash-multiple.png',
		},
		view: '#',
	},
	{
		description: {
			text: 'New Journal Entry Created',
			icon: '/cash-multiple.png',
		},
		view: '#',
	},
	{
		description: {
			text: 'New Journal Entry Created',
			icon: '/cash-multiple.png',
		},
		view: '#',
	},
	// ...
];


const NotificationCenter = () => {
	return (
		<div className="bg-white rounded-[20px] shadow-custom py-4 w-full">
      <div className='flex flex-col justify-center item-center w-full'>
          <div className="mb-4 w-full">
              <div className="">
                  <div className="flex items-center mb-2 px-6">
                      <h2 className="text-[#434343] text-start text-base font-normal">
                          Notification Center
                      </h2>
                  </div>
                  <div className='border border-foundation-grey-grey-300'></div>
              </div>
          </div>
          <div className="bg-[#fff] w-full flex flex-wrap text-[13px] items-center text-foundation-black-black-400 gap-[7px]">
              {activities.map((activity, index) => (
                  <div
                      key={index}
                      className={`flex justify-between items-center w-full gap-8 py-2 px-6 ${
                          index === activities.length - 1
                              ? ''
                              : ''
                      }`}
                  >
                      <p className="text-foundation-black-black-400 gap-2 flex items-center">
                          <Image
                              src={activity.description.icon}
                              alt={activity.description.text}
                              width={25}
                              height={25}
                          />{' '}
                          {activity.description.text}
                      </p>
                      <p className="text-primary-normal">
                          <a href={activity.view}>View</a>
                      </p>
                  </div>
              ))}
          </div>
      </div>
		</div>
	);
};

export default NotificationCenter;
