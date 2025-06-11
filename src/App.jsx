import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import NowPlaying from './pages/NowPlaying';
import NotFound from './pages/NotFound';
import PlayerProvider from './context/PlayerContext';

export default function App() {
  return (
    <BrowserRouter>
      <PlayerProvider>
        <div className="min-h-screen bg-[#121212] text-white">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/home" replace />} />
              <Route path="home" element={<Home />} />
              <Route path="search" element={<Search />} />
              <Route path="library" element={<Library />} />
              <Route path="playlist/:id" element={<Playlist />} />
              <Route path="now-playing" element={<NowPlaying />} />
              <Route path="*" element={<NotFound />} />
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