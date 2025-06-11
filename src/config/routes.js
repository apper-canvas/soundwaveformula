import Home from '../pages/Home';
import Search from '../pages/Search';
import Library from '../pages/Library';
import Playlist from '../pages/Playlist';
import NowPlaying from '../pages/NowPlaying';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/home',
    icon: 'Home',
    component: Home
  },
  search: {
    id: 'search',
    label: 'Search',
    path: '/search',
    icon: 'Search',
    component: Search
  },
  library: {
    id: 'library',
    label: 'Your Library',
    path: '/library',
    icon: 'Library',
    component: Library
  },
  nowPlaying: {
    id: 'nowPlaying',
    label: 'Now Playing',
    path: '/now-playing',
    icon: 'Music',
    component: NowPlaying
  }
};

export const routeArray = Object.values(routes);