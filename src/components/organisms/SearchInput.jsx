import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';

const SearchInput = ({ query, setQuery, searching }) => {
    return (
        <div className="relative max-w-md">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
                type="text"
                placeholder="What do you want to listen to?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-[#3E3E3E] transition-colors duration-150"
            />
            {searching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                        <ApperIcon name="Loader2" className="text-gray-400" size={20} />
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default SearchInput;