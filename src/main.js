// import { container, Template } from "webpack";
 import { getFilmCardTemplate } from "./view/film-card";
import { getFilmSectionTemplate } from "./view/films-section";
import { getMainMenuTemplate } from "./view/menu-main";
import { getFilmSortMenuTemplate } from "./view/menu-sort";
import { getPopupTemplate } from "./view/popup";
// import { getStatsTemplate } from "./view/statistic";
import { getUserProfileTemplate } from "./view/user-profile";

const FILM_CARD_VALUE = 5;

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
siteMainElement.innerHTML = '';

const  render = (container, template, place) => {
	container.insertAdjacentHTML(place, template);
};


render(siteHeaderElement, getUserProfileTemplate(), 'beforeend');
render(siteMainElement, getMainMenuTemplate(), 'beforeend');
render(siteMainElement, getFilmSortMenuTemplate(), 'beforeend');
render(siteMainElement, getFilmSectionTemplate(), 'beforeend');

const filmList = siteMainElement.querySelector('.films-list__container');
for(let i = 0; i < FILM_CARD_VALUE; i++){
	render(filmList, getFilmCardTemplate(), 'beforeend');
}

const sectionFilms = siteMainElement.querySelector('.films');
const sectionTopRated = sectionFilms.querySelector('.films-list--extra:nth-child(2) .films-list__container');
const sectionMostCommented = sectionFilms.querySelector('.films-list--extra:last-child .films-list__container');


render(sectionTopRated, getFilmCardTemplate(), 'beforeend');
render(sectionTopRated, getFilmCardTemplate(), 'beforeend');
render(sectionMostCommented, getFilmCardTemplate(), 'beforeend');
render(sectionMostCommented, getFilmCardTemplate(), 'beforeend');

//render(siteMainElement, getPopupTemplate(), 'beforeend');
