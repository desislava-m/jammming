import { client_id, client_secret } from "./credentials";

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('spotifyRefreshToken');

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`)
        },
        body: new URLSearchParams({
            'grant_type': 'refresh_token',
            'refresh_token': refreshToken
        })
    });

    const data = await response.json();

    // Update the access token and expiration time
    const expirationTime = Date.now() + data.expires_in * 1000;

    localStorage.setItem('spotifyAccessToken', data.access_token);
    localStorage.setItem('spotifyTokenExpiration', expirationTime);

    return data.access_token;
};

