import HomePage from '@/components/pages/HomePage';
import SearchPage from '@/components/pages/SearchPage';
import LibraryPage from '@/components/pages/LibraryPage';
import PlaylistPage from '@/components/pages/PlaylistPage';
import NowPlayingPage from '@/components/pages/NowPlayingPage';
// import NotFoundPage from '@/components/pages/NotFoundPage'; // Not directly used in routes array

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/home',
    icon: 'Home',
component: HomePage
  },
  search: {
    id: 'search',
    label: 'Search',
    path: '/search',
    icon: 'Search',
component: SearchPage
  },
  library: {
    id: 'library',
    label: 'Your Library',
    path: '/library',
    icon: 'Library',
component: LibraryPage
  },
  nowPlaying: {
    id: 'nowPlaying',
    label: 'Now Playing',
    path: '/now-playing',
    icon: 'Music',
component: NowPlayingPage
  }
};

export const routeArray = Object.values(routes);