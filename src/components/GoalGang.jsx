import React from 'react';
import HotGamePage from './HotGamePage';
import { hotGamePages } from '../data/hotGames';

const GoalGang = () => (
  <HotGamePage game={hotGamePages.goalGang} />
);

export default GoalGang;
