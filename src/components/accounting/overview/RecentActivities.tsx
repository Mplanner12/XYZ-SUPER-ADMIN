import Image from "next/image";


const RecentActivies = () => {

    return (
        <>
            <div className="mb-4">
                <div className="">
                    <div className="flex items-center mb-1">
                        <h2 className="text-[#434343] text-base font-normal mr-5">Recent activites</h2>
                        <Image src="/open-in-new.svg" width={25} height={25} alt="icons" />
                    </div>
                </div>
            </div>
            <div className="bg-[#fff] text-[13px] items-center text-[#374B58]">
                <div className='flex justify-between gap-8 py-4 border-b-[1px] border-[#eaecf0] mb-2'>
                    <p className="text-gray1-100">
                        New Journal Entry Created
                    </p>
                    <p className="text-primary-normal">View</p>
                </div>
                <div className='flex justify-between gap-8 pb-4 border-b-[1px] border-[#eaecf0] mb-2'>
                    <p className="text-gray1-100">
                        New Journal Entry Created
                    </p>
                    <p className="text-primary-normal">View</p>
                </div>
                         <div className='flex justify-between gap-8 pb-4 border-b-[1px] border-[#eaecf0] mb-2'>
                    <p className="text-gray1-100">
                        New Journal Entry Created
                    </p>
                    <p className="text-primary-normal">View</p>
                </div>  
                <div className='flex justify-between gap-8 pb-4 border-b-[1px] border-[#eaecf0] mb-2'>
                    <p className="text-gray1-100">
                        New Journal Entry Created
                    </p>
                    <p className="text-primary-normal">View</p>
                </div>  
                
                <div className='flex justify-between gap-8 pb-4 border-b-[1px] border-[#eaecf0] mb-2'>
                    <p className="text-gray1-100">
                        New Journal Entry Created
                    </p>
                    <p className="text-primary-normal">View</p>
                </div>  
                <div className='flex justify-between gap-8 pb-4 border-b-[1px] border-[#eaecf0] mb-2'>
                    <p className="text-gray1-100">
                        New Journal Entry Created
                    </p>
                    <p className="text-primary-normal">View</p>
                </div>  
                
            </div>
        </>
    )
}

export default RecentActivies;