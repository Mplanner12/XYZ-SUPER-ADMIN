import CustomCheckbox from '@/components/reusable/CustomCheckbox';
import React, { useState } from 'react';

const NotificationTab: React.FC = () => {
    const [automaticNotifications, setAutomaticNotifications] = useState(true);
    const [productUpdates, setProductUpdates] = useState(false);
    const [relevantCommunications, setRelevantCommunications] = useState(false);

    return (
        <div>
            <h2 className="text-2xl mb-6">Notification Settings</h2>
            <div className="space-y-4 mb-8 text-[15px]">
                <label className="flex items-center space-x-3">
                    <input
                        type="radio"
                        checked={automaticNotifications}
                        onChange={() => setAutomaticNotifications(true)}
                        className="form-radio h-5 w-5 accent-primary-normal"
                    />
                    <span className="text-gray-700">
                        Automatic notifications for approvers, buyers, or other relevant personnel at
                        different stages of the sales process.
                    </span>
                </label>

                <label className="flex items-center space-x-3">
                    <input
                        type="radio"
                        checked={!automaticNotifications}
                        onChange={() => setAutomaticNotifications(false)}
                        className="form-radio h-5 w-5 accent-primary-normal"
                    />
                    <span className="text-gray-700">Don't send notifications</span>
                </label>
            </div>

            <h2 className="text-2xl mb-6">Email & Communications</h2>

            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <CustomCheckbox
                        label="Receive notifications for product updates, promotions & Newsletters"
                    />
                </div>

                <div className="flex items-center space-x-3">
                    <CustomCheckbox
                    color="#434343"
                        label="Receive notifications for relevant communications & recommendations"
                    />
                </div>
            </div>
        </div>
    );
};

export default NotificationTab;