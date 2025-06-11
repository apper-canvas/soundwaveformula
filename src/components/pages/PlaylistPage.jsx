import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import TrackList from '@/components/organisms/TrackList';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';
import ErrorState from '@/components/molecules/ErrorState';
import Button from '@/components/atoms/Button';
import { playlistService } from '@/services';
import { usePlayer } from '@/context/PlayerContext';

export default function PlaylistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { playTrack, playerState } = usePlayer();

  useEffect(() => {
    if (id) {
      loadPlaylist();
    }
  }, [id]);

  const loadPlaylist = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await playlistService.getById(id);
      setPlaylist(result);
    } catch (err) {
      setError(err.message || 'Failed to load playlist');
      toast.error('Failed to load playlist');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAll = () => {
    if (playlist?.tracks?.length > 0) {
      playTrack(playlist.tracks[0], playlist.tracks);
      toast.success('Playing playlist');
    }
  };

  const handleShuffle = () => {
    if (playlist?.tracks?.length > 0) {
      const shuffled = [...playlist.tracks].sort(() => Math.random() - 0.5);
      playTrack(shuffled[0], shuffled);
      toast.success('Shuffling playlist');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <SkeletonLoader type="playlist-header" />
        <div className="mt-8 space-y-2">
          {[...Array(8)].map((_, i) => (
            <SkeletonLoader key={i} type="track" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorState
          message={error}
          onRetry={loadPlaylist}
        />
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="p-6">
        <ErrorState
          message="Playlist not found"
          onRetry={() => navigate('/library')}
          retryLabel="Go to Library"
        />
      </div>
    );
  }

  const totalDuration = playlist.tracks?.reduce((sum, track) => sum + (track.duration || 0), 0) || 0;
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  };

  return (
    <div className="max-w-full overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 p-6 bg-gradient-to-b from-[#2A2A2A] to-[#121212]"
      >
        <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
          <img
            src={playlist.coverUrl}
            alt={playlist.name}
            className="w-full h-full object-cover rounded-lg shadow-2xl"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white mb-2">PLAYLIST</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 break-words">
            {playlist.name}
          </h1>
          {playlist.description && (
            <p className="text-gray-300 mb-4 break-words">{playlist.description}</p>
          )}
          <div className="flex items-center space-x-1 text-sm text-gray-300">
            <span>{playlist.tracks?.length || 0} songs</span>
            {totalDuration > 0 && (
              <>
                <span>•</span>
                <span>{formatDuration(totalDuration)}</span>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center space-x-6 p-6 bg-gradient-to-b from-[#121212]/60 to-[#121212]"
      >
        <Button
          onClick={handlePlayAll}
          disabled={!playlist.tracks?.length}
          className="w-14 h-14 bg-primary hover:bg-accent text-black rounded-full flex items-center justify-center shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Play" size={24} className="ml-1" />
        </Button>
        
        <Button
          onClick={handleShuffle}
          disabled={!playlist.tracks?.length}
          className="w-8 h-8 text-gray-300 hover:text-white bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ApperIcon name="Shuffle" size={24} />
        </Button>
        
        <Button
          className="w-8 h-8 text-gray-300 hover:text-white bg-transparent"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ApperIcon name="MoreHorizontal" size={24} />
        </Button>
      </motion.div>

      {/* Track List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 pb-6"
      >
        {playlist.tracks?.length > 0 ? (
          <TrackList 
            tracks={playlist.tracks} 
            showIndex={true}
            playlist={playlist.tracks}
          />
        ) : (
          <div className="text-center py-12">
            <ApperIcon name="Music" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No songs in this playlist</h3>
            <p className="text-gray-400">Add some songs to get started</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}