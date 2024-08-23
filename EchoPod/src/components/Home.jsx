import React, { useEffect } from 'react';
import useStore from '../store';
import { Link } from 'react-router-dom';

function Home() {
  const { shows, isLoading, error, fetchShows } = useStore((state) => ({
    shows: state.shows,
    isLoading: state.isLoading,
    error: state.error,
    fetchShows: state.fetchShows,
  }));

  useEffect(() => {
    fetchShows();
  }, [fetchShows]);

  if (isLoading) return <p>Loading shows...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Podcast Shows</h1>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            <Link to={`/show/${show.id}`}>
              <img src={show.image} alt={show.title} />
              <h2>{show.title}</h2>
              <p>Seasons: {show.seasons.length}</p>
              <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
              <p>Genres: {show.genres.join(', ')}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;