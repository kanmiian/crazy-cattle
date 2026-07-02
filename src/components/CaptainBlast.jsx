import React from 'react';
import HotGamePage from './HotGamePage';
import { hotGamePages } from '../data/hotGames';

const CaptainBlast = () => (
  <HotGamePage game={hotGamePages.captainBlast} />
);

export default CaptainBlast;
