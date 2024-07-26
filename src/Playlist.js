import React, { useState } from 'react';
import Tracklist from './Tracklist';

export default function Playlist( {playlist, playlistName, onRemove, onNameChange} ) {
    return (
        <div>
            <input type="text" value={playlistName} onChange={onNameChange} placeholder='Name your playlist'></input>
            <Tracklist tracks = {playlist} onRemove = {onRemove}/>
        </div>
    )
}