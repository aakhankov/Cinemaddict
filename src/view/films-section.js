export const getFilmSectionTemplate = () => (
  `<section class="films">
		<section class="films-list">
			<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
			<div class="films-list__container">
				<!-- Список всех фильмов -->
			</div>
			<button class="films-list__show-more">Show more</button>
		</section>

		<section class="films-list films-list--extra">
			<h2 class="films-list__title">Top rated</h2>
			<div class="films-list__container">
				<!-- Список популярных фильмов -->
			</div>
		</section>

		<section class="films-list films-list--extra">
			<h2 class="films-list__title">Most commented</h2>
			<div class="films-list__container">
				<!-- Список рекомендуемых фильмов -->
			</div>
		</section>
	</section>`
);

