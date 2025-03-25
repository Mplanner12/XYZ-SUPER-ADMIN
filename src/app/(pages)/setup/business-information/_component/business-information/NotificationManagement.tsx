"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface NotificationManagementProps {
  onNext: () => void;
  onPrev: () => void;
}

// Define the schema for notification preferences validation
const notificationSchema = z.object({
  emailNotifications: z.boolean().default(false),
  inAppNotifications: z.boolean().default(false),
  systemAlerts: z.boolean().default(false),
  reportNotifications: z.boolean().default(false),
});

type NotificationType = z.infer<typeof notificationSchema>;

const NotificationManagement: React.FC<NotificationManagementProps> = ({
  onNext,
  onPrev,
}) => {
  const [notifications, setNotifications] = useState<NotificationType>({
    emailNotifications: false,
    inAppNotifications: false,
    systemAlerts: true, // System alerts typically default to on for security reasons
    reportNotifications: false,
  });

  const { handleSubmit } = useForm<NotificationType>({
    resolver: zodResolver(notificationSchema),
    defaultValues: notifications,
  });

  const toggleNotification = (key: keyof NotificationType) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const onSubmit = (data: NotificationType) => {
    console.log("Submitting notification preferences:", data);
    onNext();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center text-foundation-black-black-400 mb-6">
        Notification Preferences
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Notifications */}
        <div className="mb-4 p-6 bg-white border border-foundation-grey-grey-300 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-foundation-black-black-400">
                Email Notifications
              </h3>
              <p className="text-foundation-grey-grey-700 mt-1">
                Receive important updates via email
              </p>
            </div>
            <div
              className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors ${
                notifications.emailNotifications
                  ? "bg-foundation-purple-purple-400"
                  : "bg-foundation-grey-grey-300"
              }`}
              onClick={() => toggleNotification("emailNotifications")}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  notifications.emailNotifications
                    ? "translate-x-5"
                    : "translate-x-1"
                } my-0.5`}
              />
            </div>
          </div>
        </div>

        {/* In-App Notifications */}
        <div className="mb-4 p-6 bg-white border border-foundation-grey-grey-300 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-foundation-black-black-400">
                In-App Notifications
              </h3>
              <p className="text-foundation-grey-grey-700 mt-1">
                Get notifications within the application
              </p>
            </div>
            <div
              className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors ${
                notifications.inAppNotifications
                  ? "bg-foundation-purple-purple-400"
                  : "bg-foundation-grey-grey-300"
              }`}
              onClick={() => toggleNotification("inAppNotifications")}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  notifications.inAppNotifications
                    ? "translate-x-5"
                    : "translate-x-1"
                } my-0.5`}
              />
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="mb-4 p-6 bg-white border border-foundation-grey-grey-300 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-foundation-black-black-400">
                System Alerts
              </h3>
              <p className="text-foundation-grey-grey-700 mt-1">
                Critical system and security alerts
              </p>
            </div>
            <div
              className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors ${
                notifications.systemAlerts
                  ? "bg-foundation-purple-purple-400"
                  : "bg-foundation-grey-grey-300"
              }`}
              onClick={() => toggleNotification("systemAlerts")}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  notifications.systemAlerts ? "translate-x-5" : "translate-x-1"
                } my-0.5`}
              />
            </div>
          </div>
        </div>

        {/* Report Notifications */}
        <div className="mb-8 p-6 bg-white border border-foundation-grey-grey-300 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-foundation-black-black-400">
                Report Notifications
              </h3>
              <p className="text-foundation-grey-grey-700 mt-1">
                Scheduled report notifications
              </p>
            </div>
            <div
              className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors ${
                notifications.reportNotifications
                  ? "bg-foundation-purple-purple-400"
                  : "bg-foundation-grey-grey-300"
              }`}
              onClick={() => toggleNotification("reportNotifications")}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  notifications.reportNotifications
                    ? "translate-x-5"
                    : "translate-x-1"
                } my-0.5`}
              />
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onPrev}
            className="px-8 py-3 border border-foundation-grey-grey-300 rounded-lg text-foundation-black-black-400 hover:bg-foundation-grey-grey-50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-foundation-purple-purple-400 text-white rounded-lg hover:bg-foundation-purple-purple-300 transition-colors"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationManagement;
