import React from 'react'

export const LikeGenerate = async (movieId, token) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    const response = await fetch(`http://localhost:5000/likes/${movieId}`, options);
    return response.json();
}
