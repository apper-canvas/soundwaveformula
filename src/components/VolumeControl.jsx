import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from './ApperIcon';
import { usePlayer } from '../context/PlayerContext';

export default function VolumeControl() {
  const { playerState, setVolume } = usePlayer();
  const [showSlider, setShowSlider] = useState(false);
  const volume = playerState.volume;

  const getVolumeIcon = () => {
    if (volume === 0) return 'VolumeX';
    if (volume < 50) return 'Volume1';
    return 'Volume2';
  };

  const toggleMute = () => {
    setVolume(volume === 0 ? 50 : 0);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center space-x-2"
        onMouseEnter={() => setShowSlider(true)}
        onMouseLeave={() => setShowSlider(false)}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="p-1 text-gray-400 hover:text-white transition-colors duration-150"
        >
          <ApperIcon name={getVolumeIcon()} size={16} />
        </motion.button>

        <AnimatePresence>
          {showSlider && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 80 }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer volume-slider"
              />
              <style jsx>{`
                .volume-slider::-webkit-slider-thumb {
                  appearance: none;
                  width: 12px;
                  height: 12px;
                  border-radius: 50%;
                  background: #1DB954;
                  cursor: pointer;
                }
                .volume-slider::-moz-range-thumb {
                  width: 12px;
                  height: 12px;
                  border-radius: 50%;
                  background: #1DB954;
                  cursor: pointer;
                  border: none;
                }
              `}</style>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}