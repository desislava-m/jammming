 import React from 'react';
import Track from './Track';
import styles from './Tracklist.module.css';


export default function Tracklist({tracks, onAdd, onRemove}) {
    return (
        <ul className={styles.track}>
        {tracks.map((track, index) => (
            <Track key={index} song={track} onAdd={onAdd} onRemove={onRemove}/>
        ))}
    </ul>
    )
}