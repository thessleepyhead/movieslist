import {createContext, useState, useContext, useEffect} from "react";

const MovieContext = createContext();

export const useMovieContext = () => {
    return useContext(MovieContext);
};

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('favorites');  
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie) => {
        setFavorites((prevFavorites) => {
            if (!prevFavorites.some((fav) => fav.id === movie.id)) {
                return [...prevFavorites, movie];
            }
            return prevFavorites;
        });
    };

    const removeFromFavorites = (movieId) => {
        setFavorites((prevFavorites) => prevFavorites.filter((movie) => movie.id !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId);
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    };
    
    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};
