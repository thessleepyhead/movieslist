import MovieCard from '../components/MovieCard';
import {useState, useEffect} from 'react';
import {searchMovies, getPopularMovies} from '../services/api'
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                console.log(error);
                setError("Error fetching popular movies");
            }
            finally{
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);

const handleSearch = async (e) => {
    e.preventDefault()
    const query = searchQuery.trim();
    if (!query || loading) return;

    setLoading(true);
    try {
        const searchResults = await searchMovies(query);
        setMovies(searchResults);
        setError(null);
    } catch (err) {
        console.log(err);
        setError("Error searching for movies");
    } finally {
        setLoading(false);
    }

    setSearchQuery("");
}

  return (
    <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input 
            type="text" 
            placeholder="Search movies..." 
            className = "search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className = "search-button">Search</button>
        </form>
        {error && <div className="error-messsage">{error}</div>}


    {loading ? (
        <div className="loading">Loading...</div>
    ) : movies.length > 0 ? (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
    ) : !error ? (
        <div className="empty-state">No movies found.</div>
    ) : null}
    </div>
    )
}

export default Home;