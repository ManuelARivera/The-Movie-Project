import React from 'react'

export const GetMyLikeMovie = async (movieId, token) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    const response = await fetch(`http://localhost:5000/likes/${movieId}/liked`, options);
    return response.json();
}
