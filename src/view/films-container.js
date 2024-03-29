import Abstract from './abstract.js';

export const createFilmsContainerTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>
    <section class="films-list films-list--extra films-list--toprated">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
      </div>
    </section>
    <section class="films-list films-list--extra films-list--most-commented">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      </div>
    </section>
  </section>`
);
export default class MoviesContainer extends Abstract {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}
