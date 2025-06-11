import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

export default function EmptyState({ 
  title = 'Nothing here yet', 
  description = 'Get started by adding some content',
  actionLabel,
  onAction,
  icon = 'Folder'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="mb-6"
      >
        <ApperIcon name={icon} className="w-16 h-16 text-gray-400 mx-auto" />
      </motion.div>
      
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto break-words">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="px-6 py-3 bg-primary hover:bg-accent text-black font-medium rounded-full"
        >
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}