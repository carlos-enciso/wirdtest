import React from 'react';
import styles from './DetailView.module.css';
import back from '../../assets/arrow.png';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addPokemon, removePokemon, clearDetails } from '../../features/pokelist/pokeSlice';

export function DetailView({id}: {id: number}) {
    const dispatch = useAppDispatch();
    const { detail, selected } = useAppSelector((state) => state.poke);
    const isNotAdded = selected.findIndex((select) => select.id === id) < 0;
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.backContainer} onClick={() => dispatch(clearDetails())}>
                    <img src={back} alt="atras" className={styles.backButton}/>
                    Volver
                </div>
                <div>
                    {isNotAdded && 
                        <button className={styles.button} onClick={(e) => {
                            e.stopPropagation();
                            dispatch(addPokemon(id));
                        }}>
                            Agregar a la lista
                        </button>
                    }
                    {!isNotAdded && 
                        <button className={styles.button} onClick={(e) => {
                            e.stopPropagation();
                            dispatch(removePokemon(id));
                        }}>
                            Eliminar de la lista
                        </button>
                    }
                </div>
            </div>
            <div className={styles.detailContainer}>
                <div>
                    <div>
                        <img src={detail?.image} alt="Pokemon" />
                    </div>
                </div>
                <div>
                    <div className={styles.pokemonName}>{detail?.name}</div>
                    <div>Altura : {detail?.height}</div>
                    <div>Tipo: {detail?.type?.map((tipo, index, arr) => {
                        return `${tipo.type.name} ${index +1 === arr.length ? '' : ' - '}`;
                    })}</div>
                    <div>Ataque: {detail?.stats.attack}</div>
                    <div>Defensa: {detail?.stats.defence}</div>
                    <div>Ataque Especial: {detail?.stats.xAttack}</div>
                    <div>Defensa Especial: {detail?.stats.xDefence}</div>
                    <div>Velocidad: {detail?.stats.speed}</div>
                </div>
            </div>
        </div>
    );
}