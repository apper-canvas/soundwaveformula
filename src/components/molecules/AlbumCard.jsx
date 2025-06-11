import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import { usePlayer } from '@/context/PlayerContext';

export default function AlbumCard({ album }) {
  const { playTrack } = usePlayer();

  const handlePlay = (e) => {
    e.stopPropagation();
    if (album.tracks?.length > 0) {
      playTrack(album.tracks[0], album.tracks);
      toast.success(`Playing "${album.title}"`);
    }
  };

  const handleAlbumClick = () => {
    // In a real app, this would navigate to album view
    toast.info('Album view coming soon');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleAlbumClick}
      className="bg-surface hover:bg-[#3E3E3E] p-4 rounded-lg cursor-pointer transition-colors duration-200 group max-w-full"
    >
      <div className="relative mb-4">
        <img
          src={album.coverUrl}
          alt={album.title}
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
          {album.title}
        </h3>
        <p className="text-sm text-gray-400 truncate">
          {album.artist}
        </p>
        {album.releaseYear && (
          <p className="text-xs text-gray-500 mt-1">
            {album.releaseYear}
          </p>
        )}
      </div>
    </motion.div>
  );
}