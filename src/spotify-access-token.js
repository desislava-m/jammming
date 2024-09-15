async function getSpotifyAccessToken(client_id, client_secret) {
    
// encode credentials
const credentials = btoa(`${client_id}:${client_secret}`);

// Prepare the request options
const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`
    },
    body: new URLSearchParams({
        'grant_type': 'client_credentials'
    })
};

try {
    const response = await fetch('https://accounts.spotify.com/api/token', requestOptions);
    const data = await response.json();

    if (response.ok) {
        console.log('Access Token:', data.access_token);
        const expirationTime = Date.now() + data.expires_in * 1000;

        // Store token, refresh token, and expiration time in local storage
        localStorage.setItem('spotifyAccessToken', data.access_token);
        localStorage.setItem('spotifyRefreshToken', data.refresh_token);
        localStorage.setItem('spotifyTokenExpiration', expirationTime);
    
        return data.access_token;
    } else {
        console.error('Error fetching the token:', data);
    }
} catch (error) {
    console.error('Error during fetch:', error);
}
}

export default getSpotifyAccessToken;


async function hasValidToken() {

    if(localStorage.getItem('accessToken') == null) {
        return false
    }
    const expirationTime = Date.now()
}