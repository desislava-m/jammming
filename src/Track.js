import React from 'react';

export default function Track( {song, onAdd, onRemove} ) {
   
    return (
        <div>
            <li>{song.title} by {song.artist}
            {onAdd && <button onClick={() => onAdd(song)}>Add</button>}
            {onRemove && <button onClick = {() => onRemove(song)}>Remove</button>}
            </li> 
        </div>
    )
}