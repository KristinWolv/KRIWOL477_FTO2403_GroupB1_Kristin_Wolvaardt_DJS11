import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../store';

function ShowDetails() {
  const { id } = useParams();
  const {
    fetchShowDetails,
    shows,
    isLoading,
    error,
    addToFavourites,
    removeFromFavourites,
    favourites,
  } = useStore((state) => ({
    fetchShowDetails: state.fetchShowDetails,
    shows: state.shows,
    isLoading: state.isLoading,
    error: state.error,
    addToFavourites: state.addToFavourites,
    removeFromFavourites: state.removeFromFavourites,
    favourites: state.favourites,
  }));

  useEffect(() => {
    fetchShowDetails(id);
  }, [fetchShowDetails, id]);

  const show = shows.find((show) => show.id === id);

  if (isLoading) return <p>Loading show details...</p>;
  if (error) return <p>{error}</p>;

  if (!show) return <p>Show not found.</p>;

  return (
    <div>
      <h1>{show.title}</h1>
      <img src={show.image} alt={show.title} />
      <p>Genres: {show.genres.join(', ')}</p>
      <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>

      {show.seasons.map((season) => (
        <div key={season.id}>
          <h2>{season.title}</h2>
          <img src={season.image} alt={season.title} />
          <p>Episodes: {season.episodes.length}</p>
          {season.episodes.map((episode) => (
            <div key={episode.id}>
              <p>{episode.title}</p>
              <button onClick={() => addToFavourites(episode)}>Add to Favourites</button>
              <button onClick={() => removeFromFavourites(episode.id)}>Remove from Favourites</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ShowDetails;