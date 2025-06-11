import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import PlayerControls from '@/components/organisms/PlayerControls';
import VolumeControl from '@/components/molecules/VolumeControl';
import Button from '@/components/atoms/Button';
import { usePlayer } from '@/context/PlayerContext';

export default function NowPlayingPage() {
  const navigate = useNavigate();
  const { playerState } = usePlayer();

  if (!playerState.currentTrack) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-center">
          <ApperIcon name="Music" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-white mb-2">No song playing</h2>
          <p className="text-gray-400 mb-6">Choose a song to see it here</p>
          <Button
            onClick={() => navigate('/home')}
            className="px-4 py-2 bg-primary hover:bg-accent text-black rounded-full font-medium"
          >
            Browse Music
          </Button>
        </div>
      </div>
    );
  }

  const { currentTrack } = playerState;

  return (
    <div className="h-screen bg-gradient-to-b from-[#2A2A2A] to-[#121212] flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-4 md:p-6"
      >
        <Button
          onClick={() => navigate(-1)}
          className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-surface/50 bg-transparent"
        >
          <ApperIcon name="ChevronDown" size={24} />
        </Button>
        <div className="text-center">
          <p className="text-xs font-medium text-gray-300 uppercase tracking-wide">
            Playing from playlist
          </p>
          {/* Note: Playlist name is hardcoded, should be dynamic if possible */}
          <p className="text-sm font-medium text-white">My Playlist #1</p>
        </div>
        <Button className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-surface/50 bg-transparent">
          <ApperIcon name="MoreHorizontal" size={24} />
        </Button>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 md:px-8 max-w-4xl mx-auto w-full">
        {/* Album Art */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm md:max-w-md lg:max-w-lg mb-8"
        >
          <div className="aspect-square relative">
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </motion.div>

        {/* Track Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8 w-full"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 break-words">
            {currentTrack.title}
          </h1>
          <p className="text-lg text-gray-300 break-words">
            {currentTrack.artist}
          </p>
        </motion.div>

        {/* Player Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-md"
        >
          <PlayerControls large={true} />
        </motion.div>

        {/* Additional Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between w-full max-w-md mt-8"
        >
          <Button className="p-2 text-gray-300 hover:text-white bg-transparent">
            <ApperIcon name="Share" size={20} />
          </Button>
          
          <div className="flex items-center space-x-4">
            <Button className="p-2 text-gray-300 hover:text-primary bg-transparent">
              <ApperIcon name="Heart" size={20} />
            </Button>
            <VolumeControl />
          </div>
          
          <Button className="p-2 text-gray-300 hover:text-white bg-transparent">
            <ApperIcon name="List" size={20} />
          </Button>
        </motion.div>
      </div>

      {/* Queue Preview (Hidden on mobile) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="hidden lg:block p-6"
      >
        <div className="max-w-4xl mx-auto">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Next up</h3>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {playerState.queue.slice(1, 6).map((track, index) => (
              <div
                key={`${track.id}-${index}`}
                className="flex-shrink-0 w-48 bg-surface/20 rounded-lg p-3 hover:bg-surface/40 transition-colors duration-150 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">
                      {track.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {track.artist}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}