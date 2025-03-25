import CustomCheckbox from '@/components/reusable/CustomCheckbox';
import React, { useState } from 'react';
import TableDropDown from '../shared/TableDropDown/TableDropDown';
import { Plus } from 'lucide-react';

const AccountSettings: React.FC = () => {
    const [automaticNotifications, setAutomaticNotifications] = useState(true);
    const [productUpdates, setProductUpdates] = useState(false);
    const [relevantCommunications, setRelevantCommunications] = useState(false);

    const generateTableOptions = [
        { label: 'View Details' },
        { label: 'Edit' },
        { label: 'Delete' },
    ];

    return (
        <div className='px-4'>
            <h2 className="text-2xl mb-1">Account Settings</h2>
            <h2 className="text-xl mb-2">Select Accounting Type</h2>
            <div className="space-y-4 text-[15px] border-b border-gray-500 pb-6 mb-6">
                <label className="flex items-center space-x-3">
                    <input
                        type="radio"
                        checked={automaticNotifications}
                        onChange={() => setAutomaticNotifications(true)}
                        className="form-radio h-5 w-5 accent-primary-normal"
                    />
                    <span className="text-gray-700 font-medium">
                        Acural Basis
                    </span>
                </label>

                <label className="flex items-center space-x-3">
                    <input
                        type="radio"
                        checked={!automaticNotifications}
                        onChange={() => setAutomaticNotifications(false)}
                        className="form-radio h-5 w-5 accent-primary-normal"
                    />
                    <span className="text-gray-700  font-medium">Cash Basis</span>
                </label>
            </div>

            <h2 className="text-2xl mb-2">Multi Currency Operations</h2>

            <div className='text-[16px] mb-4'>
                <p className='text-[#727171] text-[16px] font-medium mb-2'>Currency In Use</p>
                <div className='flex gap-2 items-center mb-2'>
                    <span>
                        <TableDropDown options={generateTableOptions} />
                    </span>
                    <p className='text-[#434343]'>USD</p>
                </div>
                <div className='flex gap-2 items-center mb-2'>
                    <span>
                        <TableDropDown options={generateTableOptions} />
                    </span>
                    <p className='text-[#434343]'>BPD</p>
                </div>
                <div className='flex gap-2 items-center mb-2'>
                    <span>
                        <TableDropDown options={generateTableOptions} />
                    </span>
                    <p className='text-[#434343]'>YEN</p>
                </div>
                <div className="flex gap-1 items-center text-[#8133F1]">
                    <button className='flex gap-1'><Plus size="20px" /></button>
                    <p className='text-[18px] font-medium'>Add a new currency</p>
                </div>
            </div>

            <p className='text-[#727171] text-[16px] font-medium mb-2'>Multi Currency Setting</p>

            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <CustomCheckbox
                        label="Automatic conversion to the base currency based on  real-time exchange rates."
                    />
                </div>

                <div className="flex items-center space-x-3">
                    <CustomCheckbox
                        color="#434343"
                        label="Automatic Calculation of unrealized foreign exchange gains/losses on outstanding foreign currency balances"
                    />
                </div>

                <div className="flex items-center space-x-3">
                    <CustomCheckbox
                        label="Track realized foreign exchange gains/losses upon  settlement of foreign currency transactions"
                    />
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;