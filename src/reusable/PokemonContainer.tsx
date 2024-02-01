import React from 'react';
import styles from './PokemonContainer.module.css';
import { useAppDispatch } from '../app/hooks';
import { addPokemon, removePokemon, showDetails } from '../features/pokelist/pokeSlice';
import add from '../assets/plus.png';
import trash from '../assets/trash-can.png';

export function PokemonContainer({id, imageSource, pokemonName, isAdded = false}: {id:number, imageSource: string, pokemonName: string, isAdded?: boolean}) {
    const dispatch = useAppDispatch();
    return (
        <div className={styles.container} onClick={() => dispatch(showDetails(id))}>
            <div className={styles.sprite}>
                <img className={styles.pokemonArt} src={imageSource} alt='pokemon'/>
                {!isAdded && 
                    <button className={styles.button} onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addPokemon(id));
                    }}>
                        <img className={styles.icon} src={add} alt='Agregar Pokemon' />
                    </button>
                }
                {isAdded && 
                    <button className={styles.button} onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removePokemon(id));
                    }}>
                        <img className={styles.icon} src={trash} alt='Eliminar Pokemon' />
                    </button>
                }
            </div>
            <div className={styles.name}>{pokemonName}</div>
        </div>
    );
}