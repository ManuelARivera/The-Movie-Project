export const Login = async (user) => {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }
    const response = await fetch('http://localhost:5000/auth/login', options)
    const json = await response.json()
    if (!response.ok) throw json
    return json
}