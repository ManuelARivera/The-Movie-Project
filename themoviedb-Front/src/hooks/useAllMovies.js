import React, { useEffect, useState } from 'react'
import { GetAllMovies } from "../services/getallmovies";

export const useAllMovies = () => {
    const [movies, setMovie] = useState([])

    useEffect(() => {

        GetAllMovies().then(movies => setMovie(movies.results.map(m => ({ ...m, id: m.id }))));

    }, []);

    return {
        movies,
        setMovie
    }
}