import React from 'react';
import Tracklist from './Tracklist';
import styles from './SearchBar.module.css';


export default function Playlist( {playlist, playlistName, onRemove, onNameChange} ) {
    return (
        <div className={styles.blurContainer}>
            <input type="text" value={playlistName} onChange={onNameChange} placeholder='Name your playlist'></input>
            <Tracklist tracks = {playlist} onRemove = {onRemove}/>
            {playlist.length > 0 && <button type="submit">Save to Spotify</button>}
        </div>
    )
}