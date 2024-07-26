import React from 'react';
import Tracklist from './Tracklist';

export default function SearchResults({ songs, onAdd}) {
    return (
        <Tracklist tracks={songs} onAdd={onAdd}/>
    )
}