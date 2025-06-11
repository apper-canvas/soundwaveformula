import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ApperIcon from './ApperIcon';
import { usePlayer } from '../context/PlayerContext';

export default function PlayerControls({ large = false }) {
  const { playerState, togglePlay, skipTrack, previousTrack, setProgress } = usePlayer();
  const [localProgress, setLocalProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) {
      setLocalProgress(playerState.progress);
    }
  }, [playerState.progress, isDragging]);

  const handleProgressChange = (e) => {
    const value = parseFloat(e.target.value);
    setLocalProgress(value);
    if (!isDragging) {
      setProgress(value);
    }
  };

  const handleProgressCommit = () => {
    setProgress(localProgress);
    setIsDragging(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTime = (playerState.currentTrack?.duration || 0) * (localProgress / 100);
  const totalTime = playerState.currentTrack?.duration || 0;

  const iconSize = large ? 28 : 20;
  const playButtonSize = large ? 56 : 40;

  return (
    <div className={`flex flex-col items-center ${large ? 'space-y-4' : 'space-y-2'} w-full`}>
      {/* Controls */}
      <div className="flex items-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 text-gray-400 hover:text-white transition-colors duration-150"
        >
          <ApperIcon name="Shuffle" size={iconSize} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={previousTrack}
          className="p-2 text-gray-400 hover:text-white transition-colors duration-150"
        >
          <ApperIcon name="SkipBack" size={iconSize} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className={`${large ? 'w-14 h-14' : 'w-10 h-10'} bg-white hover:bg-gray-100 text-black rounded-full flex items-center justify-center transition-colors duration-150 shadow-lg`}
        >
          <ApperIcon 
            name={playerState.isPlaying ? "Pause" : "Play"} 
            size={large ? 24 : 16} 
            className="ml-0.5" 
          />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={skipTrack}
          className="p-2 text-gray-400 hover:text-white transition-colors duration-150"
        >
          <ApperIcon name="SkipForward" size={iconSize} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 text-gray-400 hover:text-white transition-colors duration-150"
        >
          <ApperIcon name="Repeat" size={iconSize} />
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className={`flex items-center space-x-3 w-full ${large ? 'max-w-lg' : 'max-w-md'}`}>
        <span className="text-xs text-gray-400 min-w-0">
          {formatTime(currentTime)}
        </span>
        <div className="flex-1 relative group">
          <input
            type="range"
            min="0"
            max="100"
            value={localProgress}
            onChange={handleProgressChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={handleProgressCommit}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={handleProgressCommit}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
          <style jsx>{`
            .slider::-webkit-slider-thumb {
              appearance: none;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #1DB954;
              cursor: pointer;
              opacity: 0;
              transition: opacity 0.15s ease;
            }
            .slider:hover::-webkit-slider-thumb,
            .slider:focus::-webkit-slider-thumb {
              opacity: 1;
            }
            .slider::-moz-range-thumb {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #1DB954;
              cursor: pointer;
              border: none;
              opacity: 0;
              transition: opacity 0.15s ease;
            }
            .slider:hover::-moz-range-thumb,
            .slider:focus::-moz-range-thumb {
              opacity: 1;
            }
          `}</style>
        </div>
        <span className="text-xs text-gray-400 min-w-0">
          {formatTime(totalTime)}
        </span>
      </div>

      {/* Waveform Visualization (large player only) */}
      {large && (
        <div className="flex items-center justify-center space-x-1 h-8">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-primary rounded-full waveform-bar"
              style={{
                height: `${Math.random() * 16 + 8}px`,
                animationDelay: `${i * 0.1}s`,
                opacity: playerState.isPlaying ? 1 : 0.3
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}