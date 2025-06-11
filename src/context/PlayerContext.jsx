import { createContext, useContext, useReducer, useEffect } from 'react';

const PlayerContext = createContext();

const playerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_TRACK':
      return {
        ...state,
        currentTrack: action.payload.track,
        queue: action.payload.queue || [action.payload.track],
        isPlaying: true,
        progress: 0
      };
    
    case 'TOGGLE_PLAY':
      return {
        ...state,
        isPlaying: !state.isPlaying
      };
    
    case 'SET_PLAYING':
      return {
        ...state,
        isPlaying: action.payload
      };
    
    case 'SET_PROGRESS':
      return {
        ...state,
        progress: action.payload
      };
    
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.payload
      };
    
    case 'SKIP_TRACK':
      const currentIndex = state.queue.findIndex(track => track.id === state.currentTrack?.id);
      const nextIndex = (currentIndex + 1) % state.queue.length;
      return {
        ...state,
        currentTrack: state.queue[nextIndex],
        progress: 0,
        isPlaying: true
      };
    
    case 'PREVIOUS_TRACK':
      const currentIdx = state.queue.findIndex(track => track.id === state.currentTrack?.id);
      const prevIndex = currentIdx > 0 ? currentIdx - 1 : state.queue.length - 1;
      return {
        ...state,
        currentTrack: state.queue[prevIndex],
        progress: 0,
        isPlaying: true
      };
    
    default:
      return state;
  }
};

const initialState = {
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  volume: 70,
  queue: []
};

export default function PlayerProvider({ children }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  // Simulate progress updates when playing
  useEffect(() => {
    let interval;
    if (state.isPlaying && state.currentTrack) {
      interval = setInterval(() => {
        dispatch({ 
          type: 'SET_PROGRESS', 
          payload: Math.min(state.progress + (100 / (state.currentTrack.duration || 180)), 100)
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.isPlaying, state.progress, state.currentTrack]);

  // Auto-skip when track ends
  useEffect(() => {
    if (state.progress >= 99.9 && state.isPlaying && state.queue.length > 1) {
      const currentIndex = state.queue.findIndex(track => track.id === state.currentTrack?.id);
      if (currentIndex < state.queue.length - 1) {
        dispatch({ type: 'SKIP_TRACK' });
      } else {
        dispatch({ type: 'SET_PLAYING', payload: false });
        dispatch({ type: 'SET_PROGRESS', payload: 0 });
      }
    }
  }, [state.progress, state.isPlaying, state.queue, state.currentTrack]);

  const playTrack = (track, queue = [track]) => {
    dispatch({ 
      type: 'SET_CURRENT_TRACK', 
      payload: { track, queue }
    });
  };

  const togglePlay = () => {
    dispatch({ type: 'TOGGLE_PLAY' });
  };

  const skipTrack = () => {
    if (state.queue.length > 1) {
      dispatch({ type: 'SKIP_TRACK' });
    }
  };

  const previousTrack = () => {
    if (state.queue.length > 1) {
      dispatch({ type: 'PREVIOUS_TRACK' });
    }
  };

  const setProgress = (progress) => {
    dispatch({ type: 'SET_PROGRESS', payload: progress });
  };

  const setVolume = (volume) => {
    dispatch({ type: 'SET_VOLUME', payload: volume });
  };

  const value = {
    playerState: state,
    playTrack,
    togglePlay,
    skipTrack,
    previousTrack,
    setProgress,
    setVolume
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}