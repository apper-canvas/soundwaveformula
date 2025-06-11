import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from './ApperIcon';
import PlayerControls from './PlayerControls';
import VolumeControl from './VolumeControl';
import { usePlayer } from '../context/PlayerContext';

export default function PlayerBar() {
  const navigate = useNavigate();
  const { playerState } = usePlayer();
  const { currentTrack } = playerState;

  if (!currentTrack) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-800 px-4 py-3 z-30"
    >
      <div className="flex items-center justify-between max-w-full">
        {/* Current Track Info */}
        <div className="flex items-center space-x-3 min-w-0 flex-1 lg:flex-none lg:w-1/4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/now-playing')}
            className="flex items-center space-x-3 min-w-0 flex-1 lg:flex-none"
          >
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className="w-12 h-12 rounded object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">
                {currentTrack.title}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {currentTrack.artist}
              </p>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1 text-gray-400 hover:text-primary transition-colors duration-150 flex-shrink-0"
          >
            <ApperIcon name="Heart" size={16} />
          </motion.button>
        </div>

        {/* Player Controls - Hidden on mobile */}
        <div className="hidden lg:flex flex-1 justify-center">
          <PlayerControls />
        </div>

        {/* Volume and Additional Controls - Hidden on mobile */}
        <div className="hidden lg:flex items-center justify-end space-x-4 w-1/4">
          <button className="p-1 text-gray-400 hover:text-white transition-colors duration-150">
            <ApperIcon name="List" size={16} />
          </button>
          <VolumeControl />
        </div>

        {/* Mobile Play/Pause */}
        <div className="lg:hidden flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-white hover:text-primary transition-colors duration-150"
          >
            <ApperIcon name={playerState.isPlaying ? "Pause" : "Play"} size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}