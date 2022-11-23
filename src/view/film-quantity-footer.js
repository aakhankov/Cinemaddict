const getFilmFooterTemplate = (filmFilter) => {
	if (filmFilter?.total) {
	  return `<p>${filmFilter.total} movies inside</p>`;
	}
  
	return '';
  };
  
  export { getFilmFooterTemplate };