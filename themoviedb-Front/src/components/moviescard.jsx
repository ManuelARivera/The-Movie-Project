import React from 'react'

export const MoviesCard = ({ item, onClickModal }) => {

    return (
        <div className="card-container">
            <div className="title">
                <h1>{item.title}</h1>
            </div>
            <div className="photo-container">
                <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="photomovie" />
            </div>
            <div className="btn" onClick={() => { onClickModal(); }}>
                DETAILS
            </div>
        </div>
    );
};
