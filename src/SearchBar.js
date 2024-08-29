import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import styles from './SearchBar.module.css';
import style from './SearchResults.module.css';

export default function SearchBar() {
    const [searchBar, setSearchBar] = useState('');
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [spotifyAuthToken, setSpotifyAuthToken] = useState('');
    const clientId = 'REDACTED';  // Replace with your actual client ID
    const clientSecret = 'REDACTED';  // Replace with your actual client secret
    const redirectUri = 'http://localhost:3000/callback'; // Your redirect URI

    // Function to redirect user to Spotify login
    const handleLogin = () => {
        const scopes = encodeURIComponent('user-read-private user-read-email'); // Space-separated list of scopes
        const responseType = 'code';

        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes}&response_type=${responseType}&show_dialog=true`;
    };

    // Function to retrieve the Spotify access token using the authorization code
    const fetchAccessToken = async (authCode) => {
        const tokenUrl = 'https://accounts.spotify.com/api/token';

        const headers = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret)
            }
        };

        const data = {
            code: authCode,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
        };

        try {
            const response = await axios.post(tokenUrl, new URLSearchParams(data), headers);
            const { access_token, expires_in } = response.data;
            setSpotifyAuthToken(access_token);
            localStorage.setItem('spotifyAuthToken', access_token);

            // Set up token refresh interval
            const expiresIn = (expires_in - 300) * 1000; // Refresh 5 minutes before expiry
            setTimeout(() => {
                handleLogin(); // Re-login to refresh token
            }, expiresIn);
        } catch (error) {
            console.error('Failed to retrieve access token', error);
        }
    };

    // Handle the Spotify callback to extract the authorization code
    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        const token = localStorage.getItem('spotifyAuthToken');

        if (code && !token) {
            fetchAccessToken(code);
        } else if (token) {
            setSpotifyAuthToken(token);
        }
    }, []);

    const fetchSongsFromSpotify = async (query) => {
        const endpoint = `https://api.spotify.com/v1/search?type=track&limit=10&q=${encodeURIComponent(query)}`;
        try {
            const response = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${spotifyAuthToken}`
                }
            });
            return response.data.tracks.items.map(track => ({
                title: track.name,
                artist: track.artists.map(artist => artist.name).join(', ')
            }));
        } catch (error) {
            console.error('Error fetching songs from Spotify:', error);
            return [];
        }
    };

    const handleChange = (event) => {
        setSearchBar(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (searchBar.trim()) {
            const results = await fetchSongsFromSpotify(searchBar);
            setFilteredSongs(results.length > 0 ? results : 'No results found');
        } else {
            setFilteredSongs([]);
        }
    };

    const addToPlaylist = (song) => {
        const songExists = playlist.some(playlistSong =>
            playlistSong.title === song.title && playlistSong.artist === song.artist
        );
        if (!songExists) {
            setPlaylist([...playlist, song]);
        }
    };

    const removeSong = (songToRemove) => {
        setPlaylist(playlist.filter(song => song !== songToRemove));
    };

    const handleNameChange = (event) => {
        setPlaylistName(event.target.value);
    };

    return (
        <div>
            <div className={styles.Orangesphere}></div>
            <div className={styles.Pinksphere}></div>
            <div className={styles.Bluesphere}></div>
            <div className={styles.glassContainer}>
                <h1 className={styles.h1}>Jammming</h1>
                {!spotifyAuthToken ? (
                    <button className={styles.button} onClick={handleLogin}>Login with Spotify</button>
                ) : (
                    <div className={styles.searchBarForm}>
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={searchBar} onChange={handleChange} placeholder='Search by title or artist'></input>
                            <button type='submit' className={styles.button}>Search</button>
                        </form>
                    </div>
                )}
                <div className={styles.resultsAndPlaylist}>
                    <div>
                        {filteredSongs === 'No results found' ? (
                            <h2 className={style.h2}>No results found :(</h2>
                        ) : (
                            filteredSongs.length > 0 && (
                                <SearchResults songs={filteredSongs} onAdd={addToPlaylist} />
                            )
                        )}
                    </div>
                    <div>
                        {playlist.length > 0 && <Playlist playlist={playlist} playlistName={playlistName} onRemove={removeSong} onNameChange={handleNameChange} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
