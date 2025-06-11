import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import { usePlayer } from '@/context/PlayerContext';

export default function PlaylistCard({ playlist }) {
  const navigate = useNavigate();
  const { playTrack } = usePlayer();

  const handlePlaylist = () => {
    navigate(`/playlist/${playlist.id}`);
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    if (playlist.tracks?.length > 0) {
      playTrack(playlist.tracks[0], playlist.tracks);
      toast.success(`Playing "${playlist.name}"`);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handlePlaylist}
      className="bg-surface hover:bg-[#3E3E3E] p-4 rounded-lg cursor-pointer transition-colors duration-200 group max-w-full"
    >
      <div className="relative mb-4">
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="w-full aspect-square object-cover rounded-lg shadow-lg"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          onClick={handlePlay}
          className="absolute bottom-2 right-2 w-12 h-12 bg-primary hover:bg-accent text-black rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <ApperIcon name="Play" size={20} className="ml-0.5" />
        </motion.button>
      </div>
      
      <div className="min-w-0">
        <h3 className="font-semibold text-white mb-1 truncate">
          {playlist.name}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 break-words">
          {playlist.description || `${playlist.tracks?.length || 0} songs`}
        </p>
      </div>
    </motion.div>
  );
}