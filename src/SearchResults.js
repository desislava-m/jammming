import React from 'react';
import Tracklist from './Tracklist';
import styles from './SearchBar.module.css';


export default function SearchResults({ songs, onAdd}) {
    return (
        <div className={styles.blurContainer}>
        <Tracklist tracks={songs} onAdd={onAdd} />
        </div>
    )
}