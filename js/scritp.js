var elMoviesList = $_('.movies');
var elMoviesTemplate = $_('#movies-card-template').content;

// ===========================================================

var normalizedMovies = movies.map(function (movie) {
    return {
        title: movie.Title.toString(),
        year: movie.movie_year,
        categories: movie.Categories.split('|').join(', '),
        youtubeId: `https://www.youtube.com/watch?v=${movie.ytid}`
    };
});


var createMovies = function (movie) {
    var elNewMovie = elMoviesTemplate.cloneNode(true);
    
    elNewMovie.querySelector('.js-movie-title').textContent = movie.title;
    elNewMovie.querySelector('.js-movie-year').textContent = `Year: ${movie.year}`;
    elNewMovie.querySelector('.js-movie-categories').textContent = `Categories: ${movie.categories}`;
    elNewMovie.querySelector('.js-movie-you-tube-id').textContent = `Watch trailer`;
    elNewMovie.querySelector('.js-movie-you-tube-id').href = movie.youtubeId;
    
    return elNewMovie;
};


var renderMovies = function (normalizedMovies) {
    elMoviesList.innerHTML = '';
    
    var elMoviesFragment = document.createDocumentFragment();
    
    normalizedMovies.forEach(function (movie) {
        elMoviesFragment.appendChild(createMovies(movie));
    });
    
    elMoviesList.appendChild(elMoviesFragment);
};

renderMovies(normalizedMovies.slice(0, 100));    // cut other movies exept 100 movies 

var elForm = $_('.js-form');
var elInput = $_('.js-search-input', elForm);

var searchMovies = function (e) {
    e.preventDefault();
    
    var searchFilm = elInput.value.trim();
    var searchQuery = new RegExp(searchFilm, 'gi');
    
    var moviesSearch = normalizedMovies.filter(function (movie) {
        return movie.title.match(searchQuery);
    });
    
    renderMovies(moviesSearch);
};

elForm.addEventListener('submit', searchMovies);