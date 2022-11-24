const filmStatistic = {
  watchlist: 0,
  watched: 0,
  favorite: 0,
  total: 0,
};

const userRank = {
  novice: [1, 10],
  fan: [11, 20],
  'movie buff': [21, Infinity],
};

const getUserRank = () => {
  let rank = null;
  const rankValues = Object.entries(userRank);
  for (const [key, [min, max]] of rankValues) {
    if (filmStatistic.watched >= min && filmStatistic.watched <= max) {
      rank = key;
      break;
    }
  }

  return rank;
};

const getFilmsStatistic = (filmData) => {
  if (Array.isArray(filmData)) {
    filmStatistic.total = filmData.length;

    filmData.forEach((film) => {
      filmStatistic.watchlist += film.userDetails.watchlist ? 1 : 0;
      filmStatistic.watched += film.userDetails.watched ? 1 : 0;
      filmStatistic.favorite += film.userDetails.favorite ? 1 : 0;
    });
  }

  return filmStatistic;
};

export { getFilmsStatistic, getUserRank };
