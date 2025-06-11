import React from 'react';
import { motion } from 'framer-motion';

const CategoryBrowse = ({ categories }) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h2 className="text-xl font-semibold mb-4">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative h-24 rounded-lg cursor-pointer overflow-hidden"
                        style={{ backgroundColor: category.color }}
                    >
                        <div className="p-4 h-full flex items-start">
                            <h3 className="text-white font-semibold text-lg break-words">
                                {category.name}
                            </h3>
                        </div>
                        <div className="absolute bottom-0 right-0 transform translate-x-2 translate-y-2 rotate-12">
                            <div className="w-16 h-16 bg-black/20 rounded-lg"></div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default CategoryBrowse;