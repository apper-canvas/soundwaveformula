import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className = '', type = 'button', disabled = false, whileHover, whileTap, ...rest }) => {
    const defaultWhileHover = whileHover || { scale: 1.05 };
    const defaultWhileTap = whileTap || { scale: 0.95 };

    // Filter out non-standard HTML props before passing to DOM element
    const filteredProps = { ...rest };
    delete filteredProps.initial;
    delete filteredProps.animate;
    delete filteredProps.transition;
    delete filteredProps.whileInView; // Example: if using react-intersection-observer for animations

    return (
        <motion.button
            type={type}
            onClick={onClick}
            className={`transition-colors duration-150 ${className}`}
            disabled={disabled}
            whileHover={defaultWhileHover}
            whileTap={defaultWhileTap}
            {...filteredProps}
        >
            {children}
        </motion.button>
    );
};

export default Button;