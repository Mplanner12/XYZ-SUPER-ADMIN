import React, { useState } from 'react';

const NotificationTab: React.FC = () => {
  const [automaticNotifications, setAutomaticNotifications] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);
  const [relevantCommunications, setRelevantCommunications] = useState(false);

  return (
    <div>
      <h2 className="text-lg md:text-2xl font-semibold mb-6">Notification Settings</h2>
      <div className="space-y-4 mb-8">
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            checked={automaticNotifications}
            onChange={() => setAutomaticNotifications(true)}
            className="form-radio h-5 w-5 text-indigo-600"
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
            className="form-radio h-5 w-5 text-indigo-600"
          />
          <span className="text-gray-700">Don't send notifications</span>
        </label>
      </div>

      <h2 className="text-lg md:text-2xl font-semibold mb-6">Email & Communications</h2>
      
      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={productUpdates}
            onChange={() => setProductUpdates(!productUpdates)}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="text-gray-700">
            Receive notifications for product updates, promotions & Newsletters
          </span>
        </label>
        
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={relevantCommunications}
            onChange={() => setRelevantCommunications(!relevantCommunications)}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="text-gray-700">
            Receive notifications for relevant communications & recommendations
          </span>
        </label>
      </div>
    </div>
  );
};

export default NotificationTab;