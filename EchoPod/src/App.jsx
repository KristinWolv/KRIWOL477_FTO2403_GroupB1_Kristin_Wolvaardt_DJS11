import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import useStore from './store';
import Home from './components/Home';
import ShowDetails from './components/ShowDetails';
import Favourites from './components/Favourites';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const fetchShows = useStore((state) => state.fetchShows);

  useEffect(() => {
    fetchShows();
  }, [fetchShows]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/show/:id" component={ShowDetails} />
          <Route path="/favourites" component={Favourites} />
        </Switch>
        <AudioPlayer />
      </div>
    </Router>
  );
}

export default App;