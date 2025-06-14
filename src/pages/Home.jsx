import MovieCard from "../components/MovieCard"
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError('Failed to load movies...');
            } finally {
                setLoading(false);
            }
        }

        loadPopularMovies();
    }, []);

    // const movies = [
    //     {id: 0, title: "Hammer 1", "release_date": "2021"},
    //     {id: 1, title: "Tezaab 2", "release_date": "2023"},
    //     {id: 2, title: "Mr India 4", "release_date": "2025"},
    // ];


    const handleSearch = async (e) => {
        e.preventDefault();
        
        if(!searchQuery.trim()) return;

        setLoading(true);

        if(loading) return;

        try {
            const searchedMovie = await searchMovies(searchQuery);
            setMovies(searchedMovie);
            setError(null);
        } catch (err) {
            console.log(err);
            setError('Failed to search movies...');
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for movies..." className="seach-input" onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="submit" className="search-button">Search</button>
            </form>

            { error && <div className="error-message">{error}</div> }

            { loading ? (<div>Loading...</div>) : 
                <div className="movies-grid">
                    { movies.map(movie =>
                        (<MovieCard movie={movie} key={movie.id}/>)
                    )}
                </div>
            }
        </div>
    );
};

export default Home;