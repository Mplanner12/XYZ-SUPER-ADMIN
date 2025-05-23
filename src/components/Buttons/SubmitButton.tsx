import React from 'react';

interface ISubmitButton {
    text: string | null;
    customPadding: string;
    actionType?: 'submit' | 'reset' | 'button';
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean; // New loading prop
}

const SubmitButton: React.FC<ISubmitButton> = ({ text, customPadding, actionType = 'button', onClick, disabled = false, loading = false }) => {
    return (
        <button
            type={actionType}
            onClick={onClick}
            disabled={disabled || loading} // Disable when loading
            className={`bg-foundation-purple-purple-400 border-none hover:bg-foundation-purple-purple-100 ${customPadding} cursor-pointer text-foundation-white-white-400 rounded-[16px] ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {loading ? ( // Show spinner if loading
                <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 hover:border-foundation-purple-purple-400 border-foundation-white-white-400 rounded-full cursor-not-allowed"></div>
            ) : (
                text
            )}
        </button>
    );
};

export default SubmitButton;
