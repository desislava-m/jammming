import React from 'react';
import styles from './Track.module.css';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default function Track( {song, onAdd, onRemove} ) {
   
    return (
        <div className={styles.track}>
            <li>{song.name} by {song.artist}
            {onAdd && <button onClick={() => onAdd(song)} className={styles.button}><FontAwesomeIcon icon={faPlus}/></button>}
            {onRemove && <button onClick = {() => onRemove(song)} className={styles.button}><FontAwesomeIcon icon={faMinus}/></button>}
            </li> 
        </div>
    )
}