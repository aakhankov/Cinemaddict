import { getUserProfileTemplate } from './view/user-profile.js';
import { getMainMenuTemplate } from './view/menu-main.js';
import { getFilmSortMenuTemplate } from './view/menu-sort.js';
import { getFilmSectionTemplate } from './view/films-section.js';
import { getFilmCardTemplate } from './view/film-card.js';
import { getPopupTemplate } from './view/popup.js';

const FILM_CARD_MAX_VALUE = 5;

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const HeaderTitles = {
  LISTED: 'All movies. Upcoming',
  RATED: 'Top rated',
  POPULAR: 'Most commented'
};

const sectionHeader = document.querySelector('.header');
const sectionMain = document.querySelector('.main');
sectionMain.innerHTML = '';

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

renderTemplate(sectionHeader, getUserProfileTemplate?.(), RenderPosition.BEFOREEND);
renderTemplate(sectionMain, getMainMenuTemplate?.(), RenderPosition.BEFOREEND);
renderTemplate(sectionMain, getFilmSortMenuTemplate?.(), RenderPosition.BEFOREEND);
renderTemplate(sectionMain, getFilmSectionTemplate?.(HeaderTitles.LISTED), RenderPosition.BEFOREEND);

const filmListTitle = sectionMain.querySelector('.films-list__container');
for (let i = 0; i < FILM_CARD_MAX_VALUE; i++) {
  renderTemplate(filmListTitle, getFilmCardTemplate?.(), RenderPosition.BEFOREEND);
}

const sectionFilms = sectionMain.querySelector('.films');
const sectionTopRated = sectionFilms.querySelector('.films-list--extra:nth-child(2) .films-list__container');
const sectionMostCommented = sectionFilms.querySelector('.films-list--extra:last-child .films-list__container');

renderTemplate(sectionTopRated, getFilmCardTemplate?.(), RenderPosition.BEFOREEND);
renderTemplate(sectionTopRated, getFilmCardTemplate?.(), RenderPosition.BEFOREEND);
renderTemplate(sectionMostCommented, getFilmCardTemplate?.(), RenderPosition.BEFOREEND);
renderTemplate(sectionMostCommented, getFilmCardTemplate?.(), RenderPosition.BEFOREEND);

renderTemplate(sectionMain, getPopupTemplate?.(), RenderPosition.BEFOREEND);