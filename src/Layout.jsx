import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import PlayerBar from '@/components/PlayerBar';
import { usePlayer } from '@/context/PlayerContext';

export default function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { playerState } = usePlayer();

  const sidebarItems = [
    { icon: 'Home', label: 'Home', path: '/home' },
    { icon: 'Search', label: 'Search', path: '/search' },
    { icon: 'Library', label: 'Your Library', path: '/library' }
  ];

  const isNowPlaying = location.pathname === '/now-playing';

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Desktop Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-60 bg-secondary flex-col z-40">
          {/* Logo */}
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Music" className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-white">SoundWave</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                        isActive
                          ? 'bg-surface text-white'
                          : 'text-gray-300 hover:text-white hover:bg-surface/50'
                      }`
                    }
                  >
                    <ApperIcon name={item.icon} size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Create Playlist */}
            <div className="mt-8 px-3">
              <button className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-surface/50 transition-colors duration-150">
                <ApperIcon name="Plus" size={20} />
                <span>Create Playlist</span>
              </button>
            </div>

            {/* Liked Songs */}
            <div className="mt-2 px-3">
              <NavLink
                to="/liked"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-surface/50 transition-colors duration-150"
              >
                <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-blue-500 rounded flex items-center justify-center">
                  <ApperIcon name="Heart" size={12} className="text-white" />
                </div>
                <span>Liked Songs</span>
              </NavLink>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <header className="lg:hidden bg-secondary border-b border-gray-800 px-4 py-3 flex items-center justify-between z-40">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Music" className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold">SoundWave</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              <ApperIcon name="Menu" size={24} />
            </button>
          </header>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden bg-secondary border-b border-gray-800 px-4 py-3 z-30"
            >
              <nav>
                <ul className="space-y-2">
                  {sidebarItems.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                            isActive
                              ? 'bg-surface text-white'
                              : 'text-gray-300 hover:text-white hover:bg-surface/50'
                          }`
                        }
                      >
                        <ApperIcon name={item.icon} size={20} />
                        <span>{item.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}

          {/* Page Content */}
          <div className={`flex-1 overflow-y-auto ${isNowPlaying ? '' : 'pb-24'}`}>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Player Bar - Hidden on Now Playing page */}
      {!isNowPlaying && <PlayerBar />}

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-secondary border-t border-gray-800 px-4 py-2 z-30">
        <div className="flex justify-around">
          {sidebarItems.slice(0, 3).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 px-2 py-1 ${
                  isActive ? 'text-primary' : 'text-gray-400'
                }`
              }
            >
              <ApperIcon name={item.icon} size={20} />
              <span className="text-xs">{item.label.split(' ').pop()}</span>
            </NavLink>
          ))}
          {playerState.currentTrack && (
            <NavLink
              to="/now-playing"
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 px-2 py-1 ${
                  isActive ? 'text-primary' : 'text-gray-400'
                }`
              }
            >
              <ApperIcon name="Music" size={20} />
              <span className="text-xs">Playing</span>
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
}