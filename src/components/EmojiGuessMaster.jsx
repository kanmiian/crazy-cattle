import React from 'react';
import HotGamePage from './HotGamePage';
import { hotGamePages } from '../data/hotGames';

const EmojiGuessMaster = () => (
  <HotGamePage game={hotGamePages.emojiGuessMaster} />
);

export default EmojiGuessMaster;
