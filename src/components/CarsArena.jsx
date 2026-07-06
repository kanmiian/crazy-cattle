import React from 'react';
import HotGamePage from './HotGamePage';
import { hotGamePages } from '../data/hotGames';

const CarsArena = () => (
  <HotGamePage game={hotGamePages.carsArena} />
);

export default CarsArena;
