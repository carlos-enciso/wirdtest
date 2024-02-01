import React from 'react';
import styles from './SearchResults.module.css';
import { PokemonContainer } from '../../reusable/PokemonContainer';
import { PokemonData } from '../../reusable/PokemonInterfaces';

export function SearchResults({selected}: {selected: PokemonData[]}) {
    return (
        <div className={styles.container}>            
            {selected.length > 0 &&
                <>
                    {selected.map((poke) => 
                        <PokemonContainer id={poke.id} pokemonName={poke.name} imageSource={poke.image} isAdded={true} key={poke.id}/>
                    )}                            
                </>
            }
            {selected.length === 0 &&
                <div className={styles.empty}>
                    Lista vacia no hay ningun pokemon seleccionado
                </div>
            }
        </div>
    );
}