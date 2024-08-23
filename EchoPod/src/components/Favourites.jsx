import React from 'react';
import useStore from '../store';

function Favourites() {
  const { favourites, removeFromFavourites } = useStore((state) => ({
    favourites: state.favourites,
    removeFromFavourites: state.removeFromFavourites,
  }));

  if (favourites.length === 0) return <p>No favourites added yet.</p>;

  return (
    <div>
      <h1>Favourite Episodes</h1>
      <ul>
        {favourites.map((fav) => (
          <li key={fav.id}>
            <p>{fav.title}</p>
            <p>Show: {fav.showName}</p>
            <p>Season: {fav.seasonName}</p>
            <button onClick={() => removeFromFavourites(fav.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favourites;