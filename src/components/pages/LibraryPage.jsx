import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import PlaylistCard from '@/components/molecules/PlaylistCard';
import AlbumCard from '@/components/molecules/AlbumCard';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';
import ErrorState from '@/components/molecules/ErrorState';
import EmptyState from '@/components/molecules/EmptyState';
import CreatePlaylistModal from '@/components/organisms/CreatePlaylistModal';
import Button from '@/components/atoms/Button';
import { playlistService, albumService } from '@/services';

export default function LibraryPage() {
  const [playlists, setPlaylists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadLibrary();
  }, []);

  const loadLibrary = async () => {
    setLoading(true);
    setError(null);
    try {
      const [playlistsResult, albumsResult] = await Promise.all([
        playlistService.getUserPlaylists(),
        albumService.getUserAlbums()
      ]);
      setPlaylists(playlistsResult);
      setAlbums(albumsResult);
    } catch (err) {
      setError(err.message || 'Failed to load library');
      toast.error('Failed to load library');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlaylist = async (playlistData) => {
    try {
      const newPlaylist = await playlistService.create(playlistData);
      setPlaylists(prev => [newPlaylist, ...prev]);
      setShowCreateModal(false);
      toast.success('Playlist created successfully');
    } catch (err) {
      toast.error('Failed to create playlist');
    }
  };

  const filterItems = () => {
    switch (filter) {
      case 'playlists':
        return { playlists, albums: [] };
      case 'albums':
        return { playlists: [], albums };
      default:
        return { playlists, albums };
    }
  };

  const { playlists: filteredPlaylists, albums: filteredAlbums } = filterItems();
  const hasItems = filteredPlaylists.length > 0 || filteredAlbums.length > 0;

  if (loading) {
    return (
      <div className="p-6">
        <SkeletonLoader type="library-header" />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {[...Array(8)].map((_, i) => (
            <SkeletonLoader key={i} type="card" />
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
          onRetry={loadLibrary}
        />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Your Library</h1>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="p-2 text-gray-400 hover:text-white hover:bg-surface rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ApperIcon name="Plus" size={20} />
          </Button>
        </div>
        
        <div className="hidden md:flex items-center space-x-2">
          <Button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'all'
                ? 'bg-white text-black'
                : 'bg-surface text-white hover:bg-[#3E3E3E]'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            All
          </Button>
          <Button
            onClick={() => setFilter('playlists')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'playlists'
                ? 'bg-white text-black'
                : 'bg-surface text-white hover:bg-[#3E3E3E]'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Playlists
          </Button>
          <Button
            onClick={() => setFilter('albums')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'albums'
                ? 'bg-white text-black'
                : 'bg-surface text-white hover:bg-[#3E3E3E]'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Albums
          </Button>
        </div>
      </motion.div>

      {/* Mobile Filter */}
      <div className="md:hidden mb-4 flex space-x-2 overflow-x-auto scrollbar-hide">
        <Button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
            filter === 'all'
              ? 'bg-white text-black'
              : 'bg-surface text-white hover:bg-[#3E3E3E]'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          All
        </Button>
        <Button
          onClick={() => setFilter('playlists')}
          className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
            filter === 'playlists'
              ? 'bg-white text-black'
              : 'bg-surface text-white hover:bg-[#3E3E3E]'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Playlists
        </Button>
        <Button
          onClick={() => setFilter('albums')}
          className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
            filter === 'albums'
              ? 'bg-white text-black'
              : 'bg-surface text-white hover:bg-[#3E3E3E]'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Albums
        </Button>
      </div>

      {/* Content */}
      {hasItems ? (
        <div className="space-y-8">
          {/* Playlists */}
          {filteredPlaylists.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {filter === 'all' && (
                <h2 className="text-xl font-semibold mb-4">Recently created</h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {filteredPlaylists.map((playlist, index) => (
                  <motion.div
                    key={playlist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <PlaylistCard playlist={playlist} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Albums */}
          {filteredAlbums.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {filter === 'all' && (
                <h2 className="text-xl font-semibold mb-4">Saved albums</h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {filteredAlbums.map((album, index) => (
                  <motion.div
                    key={album.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <AlbumCard album={album} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      ) : (
        <EmptyState
          title="Your library is empty"
          description="Start by creating your first playlist or saving some albums"
          actionLabel="Create Playlist"
          onAction={() => setShowCreateModal(true)}
          icon="Music"
        />
      )}

      {/* Create Playlist Modal */}
      <CreatePlaylistModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  );
}