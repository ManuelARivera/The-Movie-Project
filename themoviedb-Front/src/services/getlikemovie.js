export const GetLikeMovies = async (movieId, token) => {
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
    }
    const response = await fetch(`http://localhost:5000/likes/${movieId}`, options)
    if (!response.ok) return []
    return response.json()
}