import Image from 'next/image';
import React from 'react';



const APIIntegration: React.FC = () => {

    const items = [
        { title: "Total Receivables", content: "Import account information from Finance module seamlessly" },
        { title: "Total Payables", content: "Import account information from Sales module seamlessly" },
        { title: "Bank Transactions", content: "Import account information from Payroll module seamlessly" },
        { title: "Cash Transactions", content: "Import account information from Sales module seamlessly" },
    ];

    return (
        <main>
            <h2 className="text-2xl font-semibold mb-6">API Integration</h2>
            <div className='overflow-x-auto no-scrollbar'>
                <div className="flex justify-between gap-2 mb-4 min-w-[298%] md:min-w-[128%] lg:min-w-full ">
                    {items.map((item, index) => (
                        <div key={index} className="rounded-2xl shadow-custom bg-white w-[25%] p-3">
                            <Image src="/checkmark.png" className="mb-2" width={35} height={35} alt="icons" />
                            <p className="text-[18px] text-[#434343] mb-2 font-medium">{item.title}</p>
                            <p className="text-[15px] text-[#727171] mb-3">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default APIIntegration;