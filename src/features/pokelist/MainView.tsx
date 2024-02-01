import React, { useEffect, useState } from 'react';
import { PokemonContainer } from '../../reusable/PokemonContainer';
import search from '../../assets/search.png';
import styles from './MainView.module.css';
import { searchPokemons } from './pokeSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { SearchResults } from './SearchResults';
import { DetailView } from './DetailView';

export function MainView () {
    const dispatch = useAppDispatch();
    const { status, found, selected, detail } = useAppSelector((state) => state.poke);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        dispatch(searchPokemons(searchText));
    }, [dispatch, searchText]);

    return (
        <div className={styles.container}>
            {detail && 
                <DetailView id={detail.id} />
            }
            {!detail && 
                <div className={styles.searchContainer}>
                    <div className={styles.inputContainer}>
                        <input value={searchText} className={styles.searchBox} placeholder='Escribe el nombre o id del Pokemon aqui...' onChange={(e) => setSearchText(e.target.value)}/>
                        <img className={styles.searchIcon} src={search} alt='Buscar Pokemon' />
                    </div>
                    <div className={styles.foundContainer}>
                        {status !== 'idle' && 
                            <div className={styles.loading}>
                                ...Loading
                            </div>
                        }
                        {status === 'idle' && 
                            <>
                                {found.map((poke) => {
                                    const isSelected = selected.findIndex((select) => select.id === poke.id);
                                    return <PokemonContainer id={poke.id} pokemonName={poke.name} imageSource={poke.image} isAdded={isSelected >= 0} key={poke.id}/>
                                }
                                )}                            
                            </>
                        }
                    </div>
                </div>
            }
            <div className={styles.selectedContainer}>
                <div className={styles.selectTitle}>
                    Listos para el combate
                </div>
                <SearchResults selected={selected} />
            </div>
        </div>
    );
}