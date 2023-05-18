const addMovieModal = document.getElementById('add-modal');
const startAddMovieBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};
const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  // listRoot.removeChild(listRoot.children[movieIndex]);
  closeMovieDeletionModal();
};

// deleteMovieHandler 함수가 호출될 때마다 기존 '삭제 확인' 버튼에 이전에 추가된 이벤트 리스너가 제거되지 않기 때문입니다. 이로 인해, 버튼을 클릭할 때마다 이전에 추가된 모든 이벤트 리스너들이 실행되게 됩니다.
const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  const cancleBtn = deleteMovieModal.querySelector('.btn--passive');
  let confirmBtn = deleteMovieModal.querySelector('.btn--danger');
  // 이벤트 핸들러가 bind나 화살표 함수 등을 사용해 생성된 콜백이라면 removeEventListener를 바로 적용할 수 없다

  confirmBtn.replaceWith(confirmBtn.cloneNode(true));
  confirmBtn = deleteMovieModal.querySelector('.btn--danger');
  // confirmBtn.replaceWith(confirmBtn.cloneNode(true))는 DOM에서 '낡은 공'을 '새 공'으로 교체하지만, confirmBtn 변수는 여전히 '낡은 공'을 참조하고 있습니다. 그래서 confirmBtn = deleteMovieModal.querySelector('.btn--danger')를 사용하여 confirmBtn이 이제 '새 공'을 참조하도록 업데이트합니다.
  cancleBtn.removeEventListener('click', closeMovieDeletionModal);
  cancleBtn.addEventListener('click', closeMovieDeletionModal);
  confirmBtn.addEventListener('click', deleteMovie.bind(null, movieId));
};

const renderNewMovieEl = ({ id, title, imgUrl, rating }) => {
  const newMovieEl = document.createElement('li');
  newMovieEl.className = 'movie-element';
  newMovieEl.innerHTML = `
    <div class="movie-element__image">
      <img src="${imgUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
  newMovieEl.addEventListener('click', deleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovieEl);
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};

const clearMovieInput = () => {
  for (const input of userInputs) {
    input.value = '';
  }
};

const cancleAddMovieHandler = () => {
  closeMovieModal();
  clearMovieInput();
  toggleBackdrop();
};

const addMovieHandler = () => {
  const title = userInputs[0].value;
  const imgUrl = userInputs[1].value;
  const rating = userInputs[2].value;

  if (
    title.trim() === '' ||
    imgUrl.trim() === '' ||
    rating.trim() === '' ||
    +rating < 1 ||
    +rating > 5
  ) {
    alert('error');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title,
    imgUrl,
    rating,
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  clearMovieInput();
  renderNewMovieEl(newMovie);
  toggleBackdrop();
  updateUI();
};

const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInput();
};
startAddMovieBtn.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancleAddMovieHandler);
confirmAddMovieBtn.addEventListener('click', addMovieHandler);
