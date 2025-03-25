import React from 'react';

interface IActionButton {
    text: string | null;
    customPadding: string;
    actionType?: 'submit' | 'reset' | 'button';
    onClick?: () => void;
    disabled?: boolean;
}

const ActionButton: React.FC<IActionButton> = ({ text, customPadding, actionType = 'button', onClick, disabled = false }) => {
    return (
        <button
            type={actionType}
            onClick={onClick}
            disabled={disabled}
            className={`bg-foundation-purple-purple-400 border-none hover:bg-foundation-purple-purple-100 ${customPadding} cursor-pointer text-foundation-white-white-400 rounded-[16px] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
        >
            {text}
        </button>
    );
}

export default ActionButton;
