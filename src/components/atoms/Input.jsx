import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, className = '', required = false, ...rest }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 bg-[#3E3E3E] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-150 ${className}`}
            required={required}
            {...rest}
        />
    );
};

export default Input;