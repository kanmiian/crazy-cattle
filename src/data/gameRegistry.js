const gameModules = import.meta.glob('../content/games/*.json', {
  eager: true,
  import: 'default'
});

const sortByOrder = (getOrder) => (left, right) => {
  const leftOrder = getOrder(left);
  const rightOrder = getOrder(right);

  if (leftOrder !== rightOrder) {
    return leftOrder - rightOrder;
  }

  return left.title.localeCompare(right.title);
};

export const allGameContent = Object.values(gameModules);

export const hotGameRoutePages = allGameContent
  .filter((game) => game.pageType === 'hot-game')
  .sort(sortByOrder((game) => game.indexing?.order ?? Number.MAX_SAFE_INTEGER));

export const hotGamePages = Object.fromEntries(
  hotGameRoutePages.map((game) => [game.key, game])
);

export const hotGameUpdates = allGameContent
  .filter((game) => game.featured?.enabled)
  .sort(sortByOrder((game) => game.featured.order))
  .map((game) => ({
    ...game,
    ...game.featured
  }));

const hotGamePagesByPath = new Map(
  hotGameRoutePages.map((game) => [game.path, game])
);

export const findHotGameByPath = (path) => hotGamePagesByPath.get(path);
