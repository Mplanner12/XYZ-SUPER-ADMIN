import React from 'react'

const AppearanceTab: React.FC = () => {
    return (
        <main>
            <h2 className="text-2xl font-semibold mb-6">Change Theme</h2>
            <div className="mb-6">
                <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="radio"
                            name="theme"
                            value="light"
                            className="form-radio w-6 h-6 accent-primary-normal"
                        />
                        <span className="text-gray-800">Light Mode</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="radio"
                            name="theme"
                            value="dark"
                            className="form-radio w-6 h-6 accent-primary-normal"
                        />
                        <span className="text-gray-800">Dark Mode</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="radio"
                            name="theme"
                            value="system"
                            className="form-radio w-6 h-6 accent-primary-normal"
                        />
                        <span className="text-gray-800">Subject to System Settings</span>
                    </label>
                </div>
            </div>
        </main>
    )
}

export default AppearanceTab