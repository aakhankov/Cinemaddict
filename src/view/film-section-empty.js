const getFilmSectionEmptyTemplate = (message = '') =>
  `<section class='films'>
	  <section class='films-list'>
		<h2 class='films-list__title'>${message}</h2>
	  </section>
	</section>`;

export { getFilmSectionEmptyTemplate };
