import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import { usePlayer } from '../context/PlayerContext';

export default function TrackList({ tracks = [], showIndex = false, playlist = null }) {
  const { playTrack, playerState } = usePlayer();

  const handleTrackPlay = (track, index) => {
    const trackList = playlist || tracks;
    playTrack(track, trackList);
    toast.success(`Playing "${track.title}"`);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isCurrentTrack = (track) => {
    return playerState.currentTrack?.id === track.id;
  };

  if (!tracks.length) {
    return (
      <div className="text-center py-8">
        <ApperIcon name="Music" className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-400">No tracks available</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {/* Header (for indexed lists) */}
      {showIndex && (
        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-gray-400 border-b border-gray-800">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-5 md:col-span-6">TITLE</div>
          <div className="hidden md:block col-span-3">ALBUM</div>
          <div className="col-span-3 md:col-span-2 text-right">
            <ApperIcon name="Clock" size={14} />
          </div>
        </div>
      )}

      {/* Track List */}
      {tracks.map((track, index) => (
        <motion.div
          key={`${track.id}-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.02 }}
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          className={`grid grid-cols-12 gap-4 px-4 py-2 rounded-lg group cursor-pointer transition-colors duration-150 ${
            isCurrentTrack(track) ? 'bg-surface text-primary' : 'hover:bg-surface/50'
          }`}
          onClick={() => handleTrackPlay(track, index)}
        >
          {/* Index/Play Button */}
          <div className="col-span-1 flex items-center justify-center">
            {showIndex ? (
              <div className="relative">
                <span className={`group-hover:hidden ${isCurrentTrack(track) ? 'hidden' : 'block'} text-sm`}>
                  {index + 1}
                </span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`${isCurrentTrack(track) ? 'block' : 'hidden group-hover:block'}`}
                >
                  <ApperIcon 
                    name={isCurrentTrack(track) && playerState.isPlaying ? "Volume2" : "Play"} 
                    size={16} 
                    className={isCurrentTrack(track) ? 'text-primary' : 'text-white'}
                  />
                </motion.div>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }}>
                <ApperIcon 
                  name={isCurrentTrack(track) && playerState.isPlaying ? "Pause" : "Play"} 
                  size={16}
                  className={isCurrentTrack(track) ? 'text-primary' : 'text-gray-400 group-hover:text-white'}
                />
              </motion.div>
            )}
          </div>

          {/* Title and Artist */}
          <div className="col-span-5 md:col-span-6 flex items-center space-x-3 min-w-0">
            {!showIndex && (
              <img
                src={track.coverUrl}
                alt={track.title}
                className="w-10 h-10 rounded object-cover flex-shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className={`font-medium truncate ${isCurrentTrack(track) ? 'text-primary' : 'text-white'}`}>
                {track.title}
              </p>
              <p className="text-sm text-gray-400 truncate">
                {track.artist}
              </p>
            </div>
          </div>

          {/* Album (hidden on mobile) */}
          <div className="hidden md:flex md:col-span-3 items-center min-w-0">
            <p className="text-sm text-gray-400 truncate">
              {track.album}
            </p>
          </div>

          {/* Duration and Actions */}
          <div className="col-span-3 md:col-span-2 flex items-center justify-end space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-primary transition-all duration-150"
            >
              <ApperIcon name="Heart" size={14} />
            </motion.button>
            <span className="text-sm text-gray-400 min-w-0">
              {formatDuration(track.duration)}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-white transition-all duration-150"
            >
              <ApperIcon name="MoreHorizontal" size={14} />
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}