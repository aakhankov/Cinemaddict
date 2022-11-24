import {
  getRandomInteger,
  getNonRepeatUintArray,
  getRandomBoolean,
  getRandomPartFromArray,
  getRandomDate,
  getRandomFloatStrict,
} from './utils.js';
const BASE_IMAGE_URL = './images/posters/';
const COMMENT_MAX_QUANTITY = 50;
const COMMENT_MIN_QUANTITY = 0;
const FILM_MAX_QUANTITY = 50;
const FILM_MIN_QUANTITY = 0;
const FILM_MAX_RATE = 10;
const FILM_MIN_RATE = 0;
const FILM_MIN_PEGI = 3;
const FILM_MAX_PEGI = 18;
const FILM_MIN_RUNTIME = 70;
const FILM_MAX_RUNTIME = 180;
const FILM_DESCRIPTION_MAX_QUANTITY = 5;
const FILM_DESCRIPTION_MIN_QUANTITY = 1;
const FILM_DATE_FORMAT = 'DD MMMM YY';
const COMMENT_DATE_FORMAT = 'YYYY/MM/DD HH:mm';
const DATE_BASE_VALUE = '1950-01-01';
const DATE_GAP_MAX = 30;
const HOUR_VALUE = 60;

const filmUrl = new Map();
filmUrl
  .set('Made for Each Other', 'made-for-each-other.png')
  .set('Popeye the Sailor Meets Sindbad the Sailor', 'popeye-meets-sinbad.png')
  .set('Sagebrush Trai', 'sagebrush-trail.jpg')
  .set('The Dance of Life', 'the-dance-of-life.jpg')
  .set('The Man with the Golden Arm', 'the-man-with-the-golden-arm.jpg')
  .set('The Great Flamarion', 'the-great-flamarion.jpg')
  .set(
    'Santa Claus Conquers the Martians',
    'santa-claus-conquers-the-martians.jpg'
  );

const filmDescriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const filmCountries = [
  'USA',
  'Italy',
  'New Zealand',
  'France',
  'Great Britain',
  'Canada',
];
const filmWriters = [
  'Asghar Farhadi',
  'Woody Allen',
  'Charlie Kaufman',
  'Paul Haggis',
  'Rian Johnson',
];
const filmDirectors = [
  'Christopher Nolan',
  'Steven Spielberg',
  'Quentin Tarantino',
  'Martin Scorsese',
  'Ridley Scott',
  'Stanley Kubrick',
];
const filmActors = [
  'Leonardo DiCaprio',
  'Brad Pitt',
  'Robert De Niro',
  'Christian Bale',
  'Tom Hanks',
  'Gary Oldman',
  'Edward Norton',
];
const filmGenres = ['Drama', 'Comedy', 'Noir', 'Mystery', 'Fantasy'];
const commentEmotionTypes = ['smile', 'sleeping', 'puke', 'angry'];
const commentUserNames = [
  'Алиса Селезнёва ',
  'Пашка Гераскин',
  'Маша и Наташа Белые',
  'Коля Наумов',
  'Громозека',
  'Весельчак У',
];
const filmCommentExample = {
  smile: [
    "А film that changed my life, a true masterpiece, post-credit scene was just amazing omg.",
    "That's awesome!",
    'Great movie!',
  ],
  sleeping: [
    "Booooooooooring",
    "Almost fell asleep. Really...",
    "Good film but i'm tired.",
  ],
  puke: ["Very very old. Meh', 'It's just disgusting"],
  angry: [
    "Almost two hours? Seriously?",
    "And it's an Oscar nominee? It sucks",
    "Burn it out",
    "My eyes and ears are bleeding...",
  ],
};

const filmQuantity = getRandomInteger(FILM_MIN_QUANTITY, FILM_MAX_QUANTITY);

const prepareCommentData = () => {
  const commentEmotion =
    commentEmotionTypes[getRandomInteger(0, commentEmotionTypes.length - 1)];

  return {
    author: commentUserNames[getRandomInteger(0, commentUserNames.length - 1)],
    emotion: commentEmotion,
    content:
      filmCommentExample[commentEmotion][
        getRandomInteger(0, filmCommentExample[commentEmotion].length - 1)
      ],
    date: getRandomDate(DATE_BASE_VALUE, DATE_GAP_MAX, COMMENT_DATE_FORMAT),
  };
};

const getRandomCommentData = () => {
  const commentQuantity = getRandomInteger(
    COMMENT_MIN_QUANTITY,
    COMMENT_MAX_QUANTITY
  );

  return Array.from({ length: commentQuantity }, prepareCommentData);
};

const getFilmTime = () => {
  const time = getRandomInteger(FILM_MIN_RUNTIME, FILM_MAX_RUNTIME);
  const hour = parseInt(time / HOUR_VALUE, 10);
  const minute = time - hour * HOUR_VALUE;

  return `${hour}h ${minute}m`;
};

const prepareFilmData = () => {
  if (filmQuantity) {
    const filmName = [...filmUrl.keys()][getRandomInteger(0, filmUrl.size - 1)];
    const randomIndexes = getNonRepeatUintArray(
      0,
      filmDescriptions.length - 1,
      filmDescriptions.length
    ).slice(FILM_DESCRIPTION_MIN_QUANTITY, FILM_DESCRIPTION_MAX_QUANTITY);

    return {
      comments: getRandomCommentData(),
      filmInfo: {
        title: filmName,
        alternativeTitle: filmName,
        totalRating: getRandomFloatStrict(FILM_MIN_RATE, FILM_MAX_RATE, 1),
        poster: `${BASE_IMAGE_URL}${filmUrl.get(filmName)}`,
        pegi: getRandomInteger(FILM_MIN_PEGI, FILM_MAX_PEGI),
        director: filmDirectors[getRandomInteger(0, filmDirectors.length - 1)],
        description: randomIndexes
          .map((value) => filmDescriptions[value])
          .join(' '),
        actors: getRandomPartFromArray(filmActors).join(', '),
        genre: getRandomPartFromArray(filmGenres),
        writers: getRandomPartFromArray(filmWriters).join(', '),
        release: {
          date: getRandomDate(DATE_BASE_VALUE, DATE_GAP_MAX, FILM_DATE_FORMAT),
          country: filmCountries[getRandomInteger(0, filmCountries.length - 1)],
        },
        runtime: getFilmTime(),
      },
      userDetails: {
        watchlist: getRandomBoolean(),
        watched: getRandomBoolean(),
        favorite: getRandomBoolean(),
      },
    };
  }

  return null;
};

export const getRandomFilmData = () =>
  Array.from({ length: filmQuantity }, prepareFilmData);
