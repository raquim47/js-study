const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';
  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));
  // 메소드를 객체의 메소드로서 호출하면, "this"는 해당 객체를 가리킵니다.
  // 단독 함수(즉, 객체 메소드가 아닌 함수)를 호출하면 "this"는 전역 객체를 가리킵니다. 브라우저 환경에서 이 전역 객체는 "window"입니다.
  // 그런데 위의 코드에서는 getFormattedTitle 함수를 "함수"로서 호출하고 있습니다. 이 경우 "this"는 "window"를 가리키게 됩니다. 이것은 우리가 원하는 바가 아닙니다. 여기서는 "this"가 해당 영화 객체를 가리키길 원합니다.
  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement('li');
    const { info } = movie;
    let { getFormattedTitle } = movie;
    // getFormattedTitle =getFormattedTitle.bind(movie)

    // this는 자동으로 속한 객체를 참조하는 게 아니라 해당 메서드를 호출한 주체를 참조한다.
    // movie.getFormattedTitle()는 this가 movie가 되지만
    // getFormattedTitle()의 this는 window가 된다
    // 이때 bind를 사용한다. this가 참조할 사항을 미리 구성
    // let text = getFormattedTitle() + ' - ';
    let text = getFormattedTitle.call(movie) + ' - ';
    // bind는 나중에 실행할 함수를 준비하고 마지막에는 새로운 함수 객체를 반환해서 getFormattedTitle에 저장
    // call은 그렇지 않고 함수를 바로 실행합니다 this가 가리키는 내용을 변경
    let text = getFormattedTitle.apply(movie, []) + ' - ';
    // call, apply 첫번째 인자는 this로 같고
    // call은 두번째부터 무한하게 인자를 추가할 수 있고
    // apply는 배열 하나만 추가할 수 있다.
    for (const key in info) {
      if (key !== 'title') {
        text = text + `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }

  const newMovie = {
    info: {
      title,
      [extraName]: extraValue,
    },
    id: Math.random().toString(),

    getFormattedTitle() {
      return this.info.title.toUpperCase();
    },
  };

  movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  // 화살표 함수가 아닐 때 ! 이벤트 리스너에 바인딩함으로써 이 부분을 간접적으로 실행하는 셈이니 this는 이벤트를 실행하는 주체, 즉 이벤트 바인딩이 된 요소.
  // 화살표 함수는 this를 바인딩하지 않고 컨텍스트를 유지한다, 즉 함수 외부에서 바인딩 되었을 this를 바인딩한다.
  console.log(this);
  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);

const members = {
  teamName: 'blue',
  people: ['max', 'kim'],
  getTeamMembers() {
    this.people.forEach(function (p) {
      console.log(p + this.teamName);
    });
  },
};
members.getTeamMembers();
// forEach 내부 function은 아무런 바인딩을 갖지 않음 함수를 트리거하는 것은 객체가 아니라 forEach 즉 내부 function에서 this는 window
const members = {
  teamName: 'blue',
  people: ['max', 'kim'],
  getTeamMembers() {
    this.people.forEach( (p) => {
      console.log(p + this.teamName);
    });
  },
};