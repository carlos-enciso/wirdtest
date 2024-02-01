import React, { useEffect } from 'react';
import { MainView } from './features/pokelist/MainView';
import './App.css';
import { useAppDispatch } from './app/hooks';
import { fetchAllPokemons } from './features/pokelist/pokeSlice';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllPokemons());
  }, [dispatch]);
  return (
    <div className="App">      
      <MainView />
    </div>
  );
}

export default App;
