import playlistsData from '../mockData/playlists.json';
import { trackService } from './trackService';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PlaylistService {
  constructor() {
    this.playlists = [...playlistsData];
  }

  async getAll() {
    await delay(300);
    return [...this.playlists];
  }

  async getById(id) {
    await delay(200);
    const playlist = this.playlists.find(p => p.id === id);
    if (!playlist) {
      throw new Error('Playlist not found');
    }
    
    // Populate tracks
    const allTracks = await trackService.getAll();
    const playlistTracks = playlist.trackIds?.map(trackId => 
      allTracks.find(t => t.id === trackId)
    ).filter(Boolean) || [];
    
    return {
      ...playlist,
      tracks: playlistTracks
    };
  }

  async getFeatured(limit = 10) {
    await delay(250);
    const featured = this.playlists.filter(p => p.featured);
    return featured.slice(0, limit);
  }

  async getUserPlaylists() {
    await delay(300);
    // Simulate user's personal playlists
    return this.playlists.filter(p => p.userId === 'user1');
  }

  async search(query) {
    await delay(400);
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return this.playlists.filter(playlist => 
      playlist.name.toLowerCase().includes(searchTerm) ||
      (playlist.description && playlist.description.toLowerCase().includes(searchTerm))
    );
  }

  async create(playlistData) {
    await delay(500);
    const newPlaylist = {
      ...playlistData,
      id: Date.now().toString(),
      trackIds: [],
      tracks: [],
      userId: 'user1',
      createdAt: new Date().toISOString(),
      featured: false
    };
    this.playlists.unshift(newPlaylist);
    return { ...newPlaylist };
  }

  async update(id, data) {
    await delay(400);
    const index = this.playlists.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Playlist not found');
    }
    
    this.playlists[index] = { ...this.playlists[index], ...data };
    return { ...this.playlists[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.playlists.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Playlist not found');
    }
    
    this.playlists.splice(index, 1);
    return true;
  }

  async addTrack(playlistId, trackId) {
    await delay(300);
    const playlist = this.playlists.find(p => p.id === playlistId);
    if (!playlist) {
      throw new Error('Playlist not found');
    }
    
    if (!playlist.trackIds.includes(trackId)) {
      playlist.trackIds.push(trackId);
    }
    
    return { ...playlist };
  }

  async removeTrack(playlistId, trackId) {
    await delay(300);
    const playlist = this.playlists.find(p => p.id === playlistId);
    if (!playlist) {
      throw new Error('Playlist not found');
    }
    
    playlist.trackIds = playlist.trackIds.filter(id => id !== trackId);
    return { ...playlist };
  }
}

export const playlistService = new PlaylistService();