import React, { useState, useEffect, useRef, useCallback } from 'react';
import MovieCard from '../components/MovieCard';
import { searchMovies, getPopularMovies, getGenres } from '../services/api';
import '../css/Home.css';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resultsCount, setResultsCount] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debounceTimeout = useRef(null);
  const observer = useRef();

  // Load genres on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await getGenres();
        setGenres(genreList);
      } catch (err) {
        console.error('Failed to load genres:', err);
      }
    };
    fetchGenres();
  }, []);

  // Load initial movies
  useEffect(() => {
    loadMovies(true);
  }, [selectedGenre]);

  // Load movies based on search or genre
  const loadMovies = async (reset = false) => {
    setLoading(true);
    setError(null);
    try {
      const currentPage = reset ? 1 : page;
      const response = searchQuery
        ? await searchMovies(searchQuery, currentPage, selectedGenre)
        : await getPopularMovies(currentPage, selectedGenre);

      const validMovies = Array.isArray(response) ? response : [];
      setMovies((prev) => (reset ? validMovies : [...prev, ...validMovies]));
      setResultsCount(reset ? validMovies.length : prev.length + validMovies.length);
      setHasMore(validMovies.length > 0);
      setPage(currentPage + 1);
    } catch (err) {
      console.error(err);
      setError(`Failed to load movies: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setPage(1);
      loadMovies(true);
    }, 600);
  };

  // Genre filter click
  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId === selectedGenre ? null : genreId);
    setPage(1);
  };

  // Infinite scroll observer
  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMovies();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Discover Your Next Favorite</h1>
        <p className="hero-subtitle">
          Search for movies, TV shows, or actors. Explore what's trending and build your watchlist.
        </p>
      </section>

      {/* Search Form */}
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search for movies, TV shows, or people..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-button" disabled>
          Search
        </button>
      </form>

      {/* Genre Filters */}
      <div className="filter-section">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`filter-button ${selectedGenre === genre.id ? 'active' : ''}`}
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Results Info */}
      {!loading && !error && (
        <div className="results-info">
          Showing <span className="results-count">{resultsCount}</span> result{resultsCount !== 1 ? 's' : ''}
        </div>
      )}

      {/* Messages */}
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading...</div>}

      {/* Movie Grid */}
      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map((movie, index) => {
            if (index === movies.length - 1) {
              return <MovieCard ref={lastMovieRef} key={movie.id} movie={movie} />;
            }
            return <MovieCard key={movie.id} movie={movie} />;
          })
        ) : (
          !loading && <div>No movies found</div>
        )}
      </div>
    </div>
  );
}

export default Home;