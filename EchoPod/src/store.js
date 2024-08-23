// Zustand Store

import create from 'zustand';
import axios from 'axios';

const API_BASE_URL = 'https://podcast-api.netlify.app';

const useStore = create((set, get) => ({
  shows: [],
  favourites: JSON.parse(localStorage.getItem('favourites')) || [],
  isLoading: false,
  error: null,
  audioPlaying: false,
  audioTrack: null,

  fetchShows: async () => {
    set({ isLoading: true, error: null }); // Set loading state to true and reset error

    try {
      const response = await axios.get(`${API_BASE_URL}/shows`); // Fetch all shows from the API
      set({ shows: response.data, isLoading: false }); // Update shows state and set loading to false
    } catch (error) {
      set({ error: 'Failed to fetch shows. Please try again later.', isLoading: false }); // Handle errors
    }
  },

  fetchShowDetails: async (showId) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_BASE_URL}/shows/${showId}`); // Fetch details for a specific show
      const updatedShows = get().shows.map((show) =>
        show.id === showId ? { ...show, ...response.data } : show
      );
      set({ shows: updatedShows, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch show details. Please try again later.', isLoading: false });
    }
  },

  addToFavourites: (episode) => {
    const updatedFavourites = [...get().favourites, episode];
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    set({ favourites: updatedFavourites });
  },

  removeFromFavourites: (episodeId) => {
    const updatedFavourites = get().favourites.filter((fav) => fav.id !== episodeId);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    set({ favourites: updatedFavourites });
  },

  playAudio: (track) => {
    set({ audioPlaying: true, audioTrack: track });
  },

  stopAudio: () => {
    set({ audioPlaying: false, audioTrack: null });
  },

  resetProgress: () => {
    localStorage.removeItem('favourites');
    set({ favourites: [] });
  },
}));

export default useStore;