const getFilmListSectionTemplate = (titleText = "", isExtraSection = false) =>
  `<section class="films-list ${isExtraSection ? "films-list--extra" : ""}">
	  <h2 class="films-list__title ${
      isExtraSection ? "" : "visually-hidden"
    }">${titleText}</h2>
		<div class="films-list__container">
		  <!-- Карточки фильмов -->
		</div>
	</section>`;

export { getFilmListSectionTemplate };
