import { client_id, client_secret } from "./credentials";
import { useEffect } from "react";

export const redirectToSpotifyLogin = () => {
    const redirect_uri = 'http://localhost:3000/callback'; // Your redirect URI
    const scopes = 'playlist-modify-private playlist-modify-public user-read-private';
  
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scopes)}`;
    
    window.location.href = authUrl; // Redirect to Spotify login page
  };
  


  export const ReturnToken = () => {
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get('code');
  
      if (authorizationCode) {
        exchangeCodeForAccessToken(authorizationCode);
      }
    }, []);
  
    const exchangeCodeForAccessToken = async (code) => {
      const redirect_uri = 'http://localhost:3000/callback';
  
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`)
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirect_uri
        })
      });
  

      const data = await response.json();
      const expirationTime = Date.now() + data.expires_in * 1000;
      console.log(data); // Contains the access token and refresh token
  
      localStorage.setItem('spotifyAccessToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      localStorage.setItem('spotifyTokenExpiration', expirationTime);
    };
  
    return <div>Logging in...</div>;
    
  };
  
