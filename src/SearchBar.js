import React, { useState } from 'react';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import styles from './SearchBar.module.css';
import style from './SearchResults.module.css'
import getSpotifyAccessToken from './spotify-access-token';


export default function SearchBar() {

    const [searchBar, setSearchBar] = useState('')
    const [playlist, setPlaylist] = useState([])
    const [playlistName, setPlaylistName] = useState('')
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')


    // const songs = [

    //     { title: "Bad Blood", artist: "Taylor Swift" },
    //     { title: "Positions", artist: "Ariana Grande" },
    //     { title: "Cinderella Man", artist: "Eminem" },
    //     { title: "Summertime Sandness", artist: "Lana Del Rey" },
    //     { title: "Toxic", artist: "Britney Spears" }

    // ];
    

    const fetchTracks = async (searchTerm) => {
        const accessToken = await getSpotifyAccessToken();

        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await response.json();

        if (data.tracks && data.tracks.items) {
            const trackData = data.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name
            }));

            setFilteredSongs(trackData); // Store tracks in state
            setErrorMessage('')
        } else {
            setErrorMessage('No results found :(')
        }

    };


    const handleChange = (event) => {
        event.preventDefault()
        setSearchBar(event.target.value)

    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (searchBar.length > 0) {
            // const results = songs.filter((song) => {
            //     return song.title.toLowerCase().match(searchBar.toLowerCase()) ||
            //         song.artist.toLowerCase().match(searchBar.toLowerCase());
            // })
            // if(results.length === 0) {
            //     setFilteredSongs('No results found')
            // } else {
            //     setFilteredSongs(results)
            // }

            fetchTracks(searchBar)

        } 
    }

    const addToPlaylist = (song) => {
        const songExists = playlist.some(playlistSong =>
            playlistSong.title === song.title && playlistSong.artist === song.artist
        );
        if (!songExists) {
            setPlaylist([...playlist, song])
        }

    }

    const removeSong = (songToRemove) => {
        setPlaylist(playlist.filter(song => song !== songToRemove))
    }

    const handleNameChange = (event) => {
        setPlaylistName(event.target.value)
    }

    return (
        <div>
            <div className={styles.Orangesphere}></div>
            <div className={styles.Pinksphere}></div>
            <div className={styles.Bluesphere}></div>
            <div className={styles.glassContainer}>
                <h1 className={styles.h1}>Jammming</h1>
                <div className={styles.searchBarForm}>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={searchBar} onChange={handleChange} placeholder='Search by title or artist'></input>
                        <button type='submit' className={styles.button}>Search</button>
                    </form>
                </div>
                <div className={styles.resultsAndPlaylist}>
                    <div>
                        {errorMessage !== '' ? (
                            <h2 className={style.h2}>{errorMessage}</h2>
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
    )
};


