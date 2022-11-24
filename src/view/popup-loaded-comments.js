const getLoadedCommentTemplate = (comment = {}) => {
  const { author = "", emotion = "", content = "", date = "" } = comment;

  return `<li class="film-details__comment">
		<span class="film-details__comment-emoji">
		  <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
		</span>
		<div>
		  <p class="film-details__comment-text">${content}</p>
		  <p class="film-details__comment-info">
			<span class="film-details__comment-author">${author}</span>
			<span class="film-details__comment-day">${date}</span>
			<button class="film-details__comment-delete">Delete</button>
		  </p>
		</div>
	  </li>`;
};

const getPopupLoadedCommentTemplate = (filmData) => {
  if (filmData) {
    return `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${
      filmData?.comments ? filmData?.comments.length : 0
    }</span></h3>
		  <ul class="film-details__comments-list">
		  <!-- Отрисовка всех комментариев к фильму -->
		  ${filmData.comments
        ?.map((comment) => getLoadedCommentTemplate(comment))
        .join("")}
	  </ul>`;
  }

  return "";
};

export { getPopupLoadedCommentTemplate };
