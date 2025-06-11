import React from 'react';

const Checkbox = ({ id, checked, onChange, label, className = '', ...rest }) => {
    return (
        <div className={`flex items-center space-x-3 ${className}`}>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 text-primary bg-[#3E3E3E] border-gray-600 rounded focus:ring-primary focus:ring-2"
                {...rest}
            />
            {label && (
                <label htmlFor={id} className="text-sm text-white cursor-pointer">
                    {label}
                </label>
            )}
        </div>
    );
};

export default Checkbox;