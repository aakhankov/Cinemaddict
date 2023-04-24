import { render, renderPosition, remove, replace, isEscEvent } from '../utils/utils.js';
import Card from '../view/movie-card';
import Popup from '../view/popup.js';
import { Mode, UserAction, UpdateType, Pages } from '../constants.js';


export default class Movie {
  constructor(container, changeData, changeMode, filterType, api, commentsModel) {
    this._container = container;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filterType = filterType;
    this._api = api;
    this._commentsModel = commentsModel;

    this._bodyElement = document.querySelector('body');
    this._filmComponent = null;
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;
    this._comments = [];

    this._clickHandler = this._clickHandler.bind(this);
    this._clickClose = this._clickClose.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._handleFetchedComments = this._handleFetchedComments.bind(this);
    this._commentsModel.subscribe(this._handleFetchedComments);
  }

  init(film, scrollPosition) {
    this._film = film;
    this._scrollPosition = scrollPosition;
    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmComponent = new Card(this._film);
    this._popupComponent = new Popup(this._film, this._changeData, this._commentsModel, this._api);
    this._filmComponent.setClickHandler(this._clickHandler);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setAlreadyWatchedClickHandler(this._handleHistoryClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setClickHandler(this._clickClose);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setAlreadyWatchedClickHandler(this._handleHistoryClick);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevFilmComponent === null || prevPopupComponent === null) {
      render(this._container, this._filmComponent, renderPosition.BEFOREEND);
      return;
    }

    if (this._container.contains((prevFilmComponent.getElement())) && this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._bodyElement.contains((prevPopupComponent.getElement())) && this._mode === Mode.POPUP) {
      replace(this._popupComponent, prevPopupComponent);
      replace(this._filmComponent, prevFilmComponent);

      this._getCommentsFilm(this._film);
      this._popupComponent.getElement().scrollTo(0, this._scrollPosition);
    }
  }

  _handleFetchedComments(updateType, film) {
    if (film.id !== this._film.id) {
      return;
    }
    switch (updateType) {
      case UpdateType.PATCH:
        if (document.querySelector('.film-details')) {
          this._popupComponent.updateData(film, true);
          return;
        }
        this._popupComponent.updateData(film, false);
        if (this._popupComponent !== null) {
          this._popupComponent.removeElement();
        }
        render(this._bodyElement, this._popupComponent, renderPosition.BEFOREEND);
        this._popupComponent.restoreHandlers();
        break;
      case UpdateType.MINOR:
        if (document.querySelector('.film-details')) {
          this._popupComponent.updateData(film, false);
          return;
        }
        this._popupComponent.updateData(film, false);
        if (this._popupComponent !== null) {
          this._popupComponent.removeElement();
        }
        render(this._bodyElement, this._popupComponent, renderPosition.BEFOREEND);
        this._popupComponent.restoreHandlers();
        break;
    }
  }


  _handleFavoriteClick(scroll) {
    this._changeData(
      UserAction.UPDATE_FILM,
      this._filterType !== Pages.FAVORITES ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            favorite: !this._film.userDetails.favorite,
          },
        },
      ), this._comments, scroll,
    );
  }

  _handleWatchlistClick(scroll) {
    this._changeData(
      UserAction.UPDATE_FILM,
      this._filterType !== Pages.WATCHLIST ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            watchlist: !this._film.userDetails.watchlist,
          },
        },
      ), this._comments, scroll,
    );
  }

  _handleHistoryClick(scroll) {
    this._changeData(
      UserAction.UPDATE_FILM,
      this._filterType !== Pages.HISTORY ? UpdateType.PATCH : UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            alreadyWatched: !this._film.userDetails.alreadyWatched,
          },
        },
      ), this._comments, scroll,
    );
  }

  _getCommentsFilm(film) {
    this._api.getComments(film.id)
      .then((comments) => {
        this._commentsModel.setComments(UpdateType.MINOR, film, comments);
      })
      .catch(() => {
        this._commentsModel.setComments(UpdateType.PATCH, film, []);
      });
  }

  _clickHandler() {
    this._openPopupFilm();
    document.addEventListener('keydown', this._onEscKeyDown);
    this._bodyElement.classList.add('hide-overflow');
  }

  _clickClose() {
    this._onClosePopup();
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _openPopupFilm() {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }
    this._bodyElement.classList.add('hide-overflow');
    this._getCommentsFilm(this._film);
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _onClosePopup() {
    this._bodyElement.classList.remove('hide-overflow');
    this._popupComponent.getElement().remove();
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._onClosePopup();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

  _restoreHandlers() {
    this._popupComponent.setClickHandler(this._clickClose);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setAlreadyWatchedClickHandler(this._handleHistoryClick);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._popupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._onClosePopup();
    }
  }
}
