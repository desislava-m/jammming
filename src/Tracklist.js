import React from 'react';
import Track from './Track';

export default function Tracklist({tracks, onAdd, onRemove}) {
    return (
        <ul>
        {tracks.map((track, index) => (
            <Track key={index} song={track} onAdd={onAdd} onRemove={onRemove}/>
        ))}
    </ul>
    )
}