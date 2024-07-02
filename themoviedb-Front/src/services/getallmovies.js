export const GetAllMovies = async () => {
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    }
    const response = await fetch('http://localhost:5000/movies', options)
    if (!response.ok) return []
    return response.json()
}