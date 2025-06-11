import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
import HomePage from '@/components/pages/HomePage';
import SearchPage from '@/components/pages/SearchPage';
import LibraryPage from '@/components/pages/LibraryPage';
import PlaylistPage from '@/components/pages/PlaylistPage';
import NowPlayingPage from '@/components/pages/NowPlayingPage';
import NotFoundPage from '@/components/pages/NotFoundPage';
import PlayerProvider from './context/PlayerContext';

export default function App() {
  return (
    <BrowserRouter>
      <PlayerProvider>
        <div className="min-h-screen bg-[#121212] text-white">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/home" replace />} />
<Route path="home" element={<HomePage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="library" element={<LibraryPage />} />
              <Route path="playlist/:id" element={<PlaylistPage />} />
              <Route path="now-playing" element={<NowPlayingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            className="z-[9999]"
            toastClassName="bg-surface border border-gray-600"
            progressClassName="bg-primary"
          />
        </div>
      </PlayerProvider>
    </BrowserRouter>
  );
}