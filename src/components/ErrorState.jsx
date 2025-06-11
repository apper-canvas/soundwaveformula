import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

export default function ErrorState({ 
  message = 'Something went wrong', 
  onRetry, 
  retryLabel = 'Try again',
  icon = 'AlertCircle' 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-4"
      >
        <ApperIcon name={icon} className="w-16 h-16 text-gray-400 mx-auto" />
      </motion.div>
      
      <h3 className="text-lg font-medium text-white mb-2">Oops!</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto break-words">
        {message}
      </p>
      
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="px-6 py-2 bg-primary hover:bg-accent text-black font-medium rounded-full transition-colors duration-150"
        >
          {retryLabel}
        </motion.button>
      )}
    </motion.div>
  );
}