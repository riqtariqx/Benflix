const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOWY1YzVmNDc2Mzg0ZWFhZDNjZDNiMzhhZDU2NWQ3ZSIsIm5iZiI6MTc1NTAwNjI5Mi4zMjgsInN1YiI6IjY4OWI0NTU0ODBmNWQwZWZjZWI3MDkwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cu4O6cJbSIVy7DM--5K7LU_rWGvzSXa3nVzfcIOKhC0";
const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
  accept: "application/json",
};

// 🧠 Simple in-memory cache
const cache = {
  genres: null,
  tvGenres: null,
  popularMovies: {},
};

export const getPopularMovies = async (page = 1, genreId = null) => {
  const cacheKey = `${page}-${genreId || "all"}`;
  if (cache.popularMovies[cacheKey]) return cache.popularMovies[cacheKey];

  const genreParam = genreId ? `&with_genres=${genreId}` : '';
  const response = await fetch(
    `${BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}${genreParam}`,
    { headers }
  );
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();
  if (!data.results) throw new Error("No results found in API response");

  cache.popularMovies[cacheKey] = data.results;
  return data.results;
};

export const searchMovies = async (query, page = 1, genreId = null) => {
  const genreParam = genreId ? `&with_genres=${genreId}` : '';
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}${genreParam}`,
    { headers }
  );
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();
  if (!data.results) throw new Error("No results found in API response");

  return data.results;
};

export const getGenres = async () => {
  if (cache.genres) return cache.genres;

  const response = await fetch(`${BASE_URL}/genre/movie/list`, { headers });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();
  if (!data.genres) throw new Error("No genres found in API response");

  cache.genres = data.genres;
  return data.genres;
};

// ✅ TV Genre Support
export const getTVGenres = async () => {
  if (cache.tvGenres) return cache.tvGenres;

  const response = await fetch(`${BASE_URL}/genre/tv/list`, { headers });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();
  if (!data.genres) throw new Error("No TV genres found in API response");

  cache.tvGenres = data.genres;
  return data.genres;
};