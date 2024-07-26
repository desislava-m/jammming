import React, { useState } from 'react';
import SearchResults from './SearchResults';
import Playlist from './Playlist';


export default function SearchBar() {

    const [searchBar, setSearchBar] = useState('')
    const [filteredSongs, setFilteredSongs] = useState([])
    const [playlist, setPlaylist] = useState([])
    const [playlistName, setPlaylistName] = useState('')

    const songs = [

        { title: "Bad Blood", artist: "Taylor Swift" },
        { title: "Positions", artist: "Ariana Grande" },
        { title: "Cinderella Man", artist: "Eminem" },
        { title: "Summertime Sandness", artist: "Lana Del Rey" },
        { title: "Toxic", artist: "Britney Spears" }

    ];

    const handleChange = (event) => {
        event.preventDefault()
        setSearchBar(event.target.value)

    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (searchBar.length > 0) {
            const results = songs.filter((song) => {
                return song.title.toLowerCase().match(searchBar.toLowerCase()) ||
                    song.artist.toLowerCase().match(searchBar.toLowerCase());
            })

            setFilteredSongs(results)
        } else {
            setFilteredSongs(songs)
        };
    }

    const addToPlaylist = (song) => {
        setPlaylist([...playlist, song])
    }

    const removeSong = (songToRemove) => {
        setPlaylist(playlist.filter(song => song !== songToRemove))
    }

    const handleNameChange = (event) => {
        setPlaylistName(event.target.value)
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input type="text" value={searchBar} onChange={handleChange} placeholder='Search by title or artist'></input>
            <button type='submit'>Search</button>
            </form>
            {filteredSongs.length > 0 && <SearchResults songs={filteredSongs} onAdd = {addToPlaylist}/>}
            <Playlist playlist = {playlist} playlistName = {playlistName} onRemove = {removeSong} onNameChange = {handleNameChange}/>
        </div>
    )
};
