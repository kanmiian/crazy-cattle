import React from 'react';
import HotGamePage from './HotGamePage';
import { hotGamePages } from '../data/hotGames';

const DinoWorld = () => (
  <HotGamePage game={hotGamePages.dinoWorld} />
);

export default DinoWorld;
