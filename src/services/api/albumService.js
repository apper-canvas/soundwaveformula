import albumsData from '../mockData/albums.json';
import { trackService } from './trackService';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class AlbumService {
  constructor() {
    this.albums = [...albumsData];
  }

  async getAll() {
    await delay(300);
    return [...this.albums];
  }

  async getById(id) {
    await delay(200);
    const album = this.albums.find(a => a.id === id);
    if (!album) {
      throw new Error('Album not found');
    }
    
    // Populate tracks
    const allTracks = await trackService.getAll();
    const albumTracks = allTracks.filter(t => t.album === album.title);
    
    return {
      ...album,
      tracks: albumTracks
    };
  }

  async getNewReleases(limit = 10) {
    await delay(250);
    // Sort by release year descending
    const sorted = [...this.albums].sort((a, b) => b.releaseYear - a.releaseYear);
    return sorted.slice(0, limit);
  }

  async getUserAlbums() {
    await delay(300);
    // Simulate user's saved albums
    return this.albums.filter(a => a.saved);
  }

  async search(query) {
    await delay(400);
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return this.albums.filter(album => 
      album.title.toLowerCase().includes(searchTerm) ||
      album.artist.toLowerCase().includes(searchTerm)
    );
  }

  async create(albumData) {
    await delay(500);
    const newAlbum = {
      ...albumData,
      id: Date.now().toString(),
      tracks: albumData.tracks || [],
      saved: false
    };
    this.albums.unshift(newAlbum);
    return { ...newAlbum };
  }

  async update(id, data) {
    await delay(400);
    const index = this.albums.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error('Album not found');
    }
    
    this.albums[index] = { ...this.albums[index], ...data };
    return { ...this.albums[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.albums.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error('Album not found');
    }
    
    this.albums.splice(index, 1);
    return true;
  }

  async toggleSave(id) {
    await delay(300);
    const album = this.albums.find(a => a.id === id);
    if (!album) {
      throw new Error('Album not found');
    }
    
    album.saved = !album.saved;
    return { ...album };
  }
}

export const albumService = new AlbumService();