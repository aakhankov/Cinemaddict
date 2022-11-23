import { getUserProfileTemplate } from './view/user-profile.js';
import { getMainMenuTemplate } from './view/menu-main.js';
import { getFilmSortMenuTemplate } from './view/menu-sort.js';
import { getFilmSectionTemplate } from './view/films-section.js';
import { getFilmListSectionTemplate } from './view/film-list-section.js';
import { getFilmSectionEmptyTemplate } from './view/film-section-empty.js';
import { getFilmCardTemplate } from './view/film-card.js';
import { getFilmFooterTemplate } from './view/film-quantity-footer.js';
import { getShowMoreButtonTemplate } from './view/show-more-button.js';
import { getPopupTemplate } from './view/popup.js';
import { getFilmsStatistic, getUserRank } from './mock/filter.js';
import { getRandomFilmData } from './mock/data.js';
import { getTopRatedFilmsData, getTopCommentedFilmsData } from './mock/utils.js';

const FILM_CARD_INITIAL_VALUE = 5;
const FILM_EXTRA_SECTION = 1;
const FILM_EXTRA_QUANTITY = 2;

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const SectionMessages = {
	DEFAULT: 'All movies. Upcoming',
	RATED: 'Top rated',
	POPULAR: 'Most commented',
	NO_MOVIES: 'There are no movies in our database',
	NO_WATCHLIST: 'There are no movies to watch now',
	NO_HISTORY: 'There are no watched movies now',
	NO_FAVORITE: 'There are no favorite movies now'
};

const filmsData = getRandomFilmData();
const filmsTopRated = getTopRatedFilmsData(filmsData).slice(0, FILM_EXTRA_QUANTITY);
const filmsTopCommented = getTopCommentedFilmsData(filmsData).slice(0, FILM_EXTRA_QUANTITY);
const filmStatistics = getFilmsStatistic(filmsData);
const userRank = getUserRank();

let shownFilmQuantity = (filmsData.length > FILM_CARD_INITIAL_VALUE) ?
  FILM_CARD_INITIAL_VALUE :
  filmsData.length;

const sectionHeader = document.querySelector('.header');
const sectionMain = document.querySelector('.main');
const sectionFooter = document.querySelector('.footer');
const footerStatistic = sectionFooter.querySelector('.footer__statistics');
sectionMain.innerHTML = '';

const renderTemplate = (container, template, place) => container.insertAdjacentHTML(place, template);

renderTemplate(sectionHeader, getUserProfileTemplate?.(userRank), RenderPosition.BEFOREEND);
renderTemplate(sectionMain, getMainMenuTemplate?.(filmStatistics), RenderPosition.BEFOREEND);
renderTemplate(sectionMain, getFilmSortMenuTemplate?.(), RenderPosition.BEFOREEND);

if (shownFilmQuantity) {

  renderTemplate(sectionMain, getFilmSectionTemplate?.(), RenderPosition.BEFOREEND);
  const filmSection = sectionMain.querySelector('.films');

  renderTemplate(filmSection, getFilmListSectionTemplate?.(SectionMessages.DEFAULT), RenderPosition.BEFOREEND);
  const filmMainListSection = filmSection.querySelector('.films-list__container');

  let filmRatedListSection = '';
  if (filmsTopRated.length >= FILM_EXTRA_QUANTITY) {
    renderTemplate(filmSection, getFilmListSectionTemplate?.(SectionMessages.RATED, FILM_EXTRA_SECTION), RenderPosition.BEFOREEND);
    filmRatedListSection = filmSection.querySelector('.films-list--extra:last-child .films-list__container');
  }

  let filmPopularListSection = '';
  if (filmsTopCommented.length >= FILM_EXTRA_QUANTITY) {
    renderTemplate(filmSection, getFilmListSectionTemplate?.(SectionMessages.POPULAR, FILM_EXTRA_SECTION), RenderPosition.BEFOREEND);
    filmPopularListSection = filmSection.querySelector('.films-list--extra:last-child .films-list__container');
  }

  for (let i = 0; i < shownFilmQuantity; i++) {

    renderTemplate(filmMainListSection, getFilmCardTemplate?.(filmsData[i]), RenderPosition.BEFOREEND);

    if (i < FILM_EXTRA_QUANTITY) {

      if (filmRatedListSection) {
        renderTemplate(filmRatedListSection, getFilmCardTemplate?.(filmsTopRated[i]), RenderPosition.BEFOREEND);
      }

      if (filmPopularListSection) {
        renderTemplate(filmPopularListSection, getFilmCardTemplate?.(filmsTopCommented[i]), RenderPosition.BEFOREEND);
      }
    }
  }

  const onShowMoreButtonClick = (evt) => {
    if (shownFilmQuantity < filmsData.length) {
      const lastShownQuantity = shownFilmQuantity;
      const restFilms = filmsData.length - shownFilmQuantity;
      shownFilmQuantity += (restFilms < FILM_CARD_INITIAL_VALUE) ? restFilms : FILM_CARD_INITIAL_VALUE;
      filmsData.slice(lastShownQuantity, shownFilmQuantity)
        .forEach((film) => renderTemplate(filmMainListSection, getFilmCardTemplate?.(film), RenderPosition.BEFOREEND));

      if (shownFilmQuantity >= filmsData.length) {
        evt.target.remove();
      }
    }
  };

  if (filmsData.length > FILM_CARD_INITIAL_VALUE) {
    renderTemplate(filmMainListSection, getShowMoreButtonTemplate?.(), RenderPosition.AFTEREND);
    const showMoreButton = filmSection.querySelector('.films-list__show-more');
    showMoreButton.addEventListener('click', onShowMoreButtonClick);
  }

} else {
  renderTemplate(sectionMain, getFilmSectionEmptyTemplate?.(SectionMessages.NO_MOVIES), RenderPosition.BEFOREEND);
}

if (shownFilmQuantity) {

  renderTemplate(footerStatistic, getFilmFooterTemplate?.(filmStatistics), RenderPosition.BEFOREEND);
  renderTemplate(sectionFooter, getPopupTemplate?.(filmsData[0]), RenderPosition.AFTEREND);
  const filmPopup = document.querySelector('.film-details');
  const popupButtonClose = filmPopup.querySelector('.film-details__close-btn');
  const popupCommentSelectors = filmPopup.querySelectorAll('.film-details__bottom-container li button');

  const onButtonCloseClick = (evt) => {
    evt.target.closest('li').remove();
  };
  popupCommentSelectors.forEach((commentSelector) => commentSelector.addEventListener('click', onButtonCloseClick));

  const onPopupButtonClose = () => {
    filmPopup.remove();
  };
  popupButtonClose.addEventListener('click', onPopupButtonClose);
}