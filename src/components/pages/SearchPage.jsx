import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import TrackList from '@/components/organisms/TrackList';
import PlaylistCard from '@/components/molecules/PlaylistCard';
import AlbumCard from '@/components/molecules/AlbumCard';
import SkeletonLoader from '@/components/atoms/SkeletonLoader';
import EmptyState from '@/components/molecules/EmptyState';
import ErrorState from '@/components/molecules/ErrorState';
import SearchInput from '@/components/organisms/SearchInput';
import CategoryBrowse from '@/components/organisms/CategoryBrowse';
import { trackService, playlistService, albumService } from '@/services';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const timeoutId = setTimeout(() => {
        performSearch();
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setTracks([]);
      setPlaylists([]);
      setAlbums([]);
    }
  }, [query]);

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      // Mock categories for browse
      setCategories([
        { id: '1', name: 'Pop', color: '#E13BFB' },
        { id: '2', name: 'Hip-Hop', color: '#BA5D07' },
        { id: '3', name: 'Rock', color: '#8D67AB' },
        { id: '4', name: 'Jazz', color: '#1E3264' },
        { id: '5', name: 'Electronic', color: '#E8115B' },
        { id: '6', name: 'Country', color: '#B49BC8' }
      ]);
    } catch (err) {
      setError(err.message || 'Failed to load categories');
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async () => {
    setSearching(true);
    setError(null);
    try {
      const [tracksResult, playlistsResult, albumsResult] = await Promise.all([
        trackService.search(query),
        playlistService.search(query),
        albumService.search(query)
      ]);
      setTracks(tracksResult);
      setPlaylists(playlistsResult);
      setAlbums(albumsResult);
    } catch (err) {
      setError(err.message || 'Search failed');
      toast.error('Search failed');
    } finally {
      setSearching(false);
    }
  };

  const hasResults = tracks.length > 0 || playlists.length > 0 || albums.length > 0;

  if (loading) {
    return (
      <div className="p-6">
        <SkeletonLoader type="search-header" />
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <SkeletonLoader key={i} type="category" />
          ))}
        </div>
      </div>
    );
  }

  if (error && !query) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <SearchInput query={query} setQuery={setQuery} searching={searching} />
        </div>
        <ErrorState
          message={error}
          onRetry={loadCategories}
        />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full overflow-hidden">
      {/* Search Header */}
      <div className="mb-6">
        <SearchInput query={query} setQuery={setQuery} searching={searching} />
      </div>

      {/* Search Results */}
      {query.trim() ? (
        searching ? (
          <div className="space-y-6">
            <SkeletonLoader type="section-title" />
            <div className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <SkeletonLoader key={i} type="track" />
              ))}
            </div>
          </div>
        ) : hasResults ? (
          <div className="space-y-8">
            {/* Top Result */}
            {tracks.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-semibold mb-4">Top result</h2>
                <div className="bg-surface rounded-lg p-6 hover:bg-[#3E3E3E] transition-colors duration-150 cursor-pointer max-w-md">
                  <div className="flex items-center space-x-4">
                    <img
                      src={tracks[0].coverUrl}
                      alt={tracks[0].title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold truncate">{tracks[0].title}</h3>
                      <p className="text-gray-400 text-sm truncate">{tracks[0].artist}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="bg-gray-700 px-2 py-1 rounded text-xs">SONG</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Songs */}
            {tracks.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-semibold mb-4">Songs</h2>
                <TrackList tracks={tracks.slice(0, 4)} showIndex={false} />
              </motion.section>
            )}

            {/* Albums */}
            {albums.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold mb-4">Albums</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {albums.slice(0, 5).map((album, index) => (
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
            )}

            {/* Playlists */}
            {playlists.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-4">Playlists</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {playlists.slice(0, 5).map((playlist, index) => (
                    <motion.div
                      key={playlist.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <PlaylistCard playlist={playlist} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        ) : (
          <EmptyState
            title="No results found"
            description={`Try searching for something else or check your spelling`}
            icon="Search"
          />
        )
      ) : (
        /* Browse Categories */
        <CategoryBrowse categories={categories} />
      )}
    </div>
  );
}