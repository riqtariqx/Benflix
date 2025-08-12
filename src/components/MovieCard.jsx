import "../css/MovieCard.css";
import PropTypes from "prop-types"; // Optional: for prop validation

function MovieCard({ movie }) {
  const handleFavoriteClick = () => {
    alert("clicked"); // Replace with actual favorite functionality
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image" // Public placeholder image
          }
          alt={movie.title || "Movie poster"}
        />
        <div className="movie-overlay">
          <button
            className="favorite-btn"
            onClick={handleFavoriteClick}
            aria-label="Favorite movie"
          >
            ❤️
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title || "Unknown Title"}</h3>
        <p>{movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</p>
      </div>
    </div>
  );
}

// Optional: Prop validation
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
  }).isRequired,
};

export default MovieCard; // Optionally: export default React.memo(MovieCard);