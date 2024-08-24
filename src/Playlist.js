import React from 'react';
import Tracklist from './Tracklist';
import styles from './SearchBar.module.css';
import playListStyle from './Playlist.module.css';


export default function Playlist( {playlist, playlistName, onRemove, onNameChange} ) {
    return (
        <div className={styles.blurContainer}>
            <input className={playListStyle.input} type="text" value={playlistName} onChange={onNameChange} placeholder='Name your playlist'></input>
            <Tracklist tracks = {playlist} onRemove = {onRemove}/>
            {playlist.length > 0 && <button type="submit" className={playListStyle.button}>Save to Spotify</button>}
        </div>
    )
}