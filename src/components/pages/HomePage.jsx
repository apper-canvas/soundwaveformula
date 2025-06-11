import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TrackList from '@/components/organisms/TrackList';
import PlaylistCard from '@/components/molecules/PlaylistCard';
import AlbumCard from '@/components/molecules/AlbumCard';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';
import ErrorState from '@/components/molecules/ErrorState';
import Button from '@/components/atoms/Button';
import { trackService, playlistService, albumService } from '@/services';

export default function HomePage() {
  const [recentTracks, setRecentTracks] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [tracks, playlists, albums] = await Promise.all([
        trackService.getRecent(),
        playlistService.getFeatured(),
        albumService.getNewReleases()
      ]);
      setRecentTracks(tracks.slice(0, 6));
      setFeaturedPlaylists(playlists.slice(0, 6));
      setNewReleases(albums.slice(0, 6));
    } catch (err) {
      setError(err.message || 'Failed to load home data');
      toast.error('Failed to load home data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-8">
        <SkeletonLoader type="header" />
        <div className="space-y-6">
          <SkeletonLoader type="section-title" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <SkeletonLoader type="section-title" />
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader key={i} type="track" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorState
          message={error}
          onRetry={loadHomeData}
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
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Good evening</h1>
        <p className="text-gray-400">Welcome back to your music</p>
      </motion.div>

      {/* Featured Playlists */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Featured Playlists</h2>
          <Button className="text-sm text-gray-400 hover:text-white bg-transparent" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Show all
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {featuredPlaylists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <PlaylistCard playlist={playlist} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* New Releases */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">New Releases</h2>
          <Button className="text-sm text-gray-400 hover:text-white bg-transparent" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Show all
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {newReleases.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <AlbumCard album={album} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Recently Played */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recently Played</h2>
          <Button className="text-sm text-gray-400 hover:text-white bg-transparent" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Show all
          </Button>
        </div>
        <TrackList tracks={recentTracks} showIndex={false} />
      </motion.section>
    </div>
  );
}