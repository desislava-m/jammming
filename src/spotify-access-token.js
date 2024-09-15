async function hasValidToken() {
    const token = localStorage.getItem('spotifyAccessToken');
    const expirationTime = localStorage.getItem('spotifyTokenExpiration');

    if (!token) {
        console.log('No access token found.');
        return false;
    }

    // Check if the token has expired
    const currentTime = Date.now();
    if (currentTime > expirationTime) {
        console.log('Access token has expired.');
        return false;
    }

    // Token is still valid
    console.log('Access token is still valid.');
    return true;
}



async function getSpotifyAccessToken(client_id, client_secret) {

    if( hasValidToken() ) {
        const token = localStorage.getItem('spotifyAccessToken')
        return token
    }
    else
    {
         // encode credentials
        const credentials = btoa(`${client_id}:${client_secret}`);

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
}

export default getSpotifyAccessToken;




