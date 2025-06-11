import tracksData from '../mockData/tracks.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class TrackService {
  constructor() {
    this.tracks = [...tracksData];
  }

  async getAll() {
    await delay(300);
    return [...this.tracks];
  }

  async getById(id) {
    await delay(200);
    const track = this.tracks.find(t => t.id === id);
    if (!track) {
      throw new Error('Track not found');
    }
    return { ...track };
  }

  async getRecent(limit = 10) {
    await delay(250);
    // Simulate recently played tracks
    const shuffled = [...this.tracks].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  }

  async search(query) {
    await delay(400);
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return this.tracks.filter(track => 
      track.title.toLowerCase().includes(searchTerm) ||
      track.artist.toLowerCase().includes(searchTerm) ||
      track.album.toLowerCase().includes(searchTerm)
    );
  }

  async create(trackData) {
    await delay(500);
    const newTrack = {
      ...trackData,
      id: Date.now().toString(),
      duration: trackData.duration || 180
    };
    this.tracks.unshift(newTrack);
    return { ...newTrack };
  }

  async update(id, data) {
    await delay(400);
    const index = this.tracks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Track not found');
    }
    
    this.tracks[index] = { ...this.tracks[index], ...data };
    return { ...this.tracks[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.tracks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Track not found');
    }
    
    this.tracks.splice(index, 1);
    return true;
  }
}

export const trackService = new TrackService();