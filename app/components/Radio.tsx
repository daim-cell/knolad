import React from 'react';

interface RadioButtonProps {
    label: string;
    name: string;
    value: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, name, value, checked, onChange }) => {
    return (
        <label className="flex items-center space-x-2">
            <input 
                type="radio" 
                name={name} 
                value={value} 
                checked={checked} 
                onChange={onChange} 
                className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">{label}</span>
        </label>
    );
};

export default RadioButton;
