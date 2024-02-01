export interface PokemonData {
    id: number;
    name: string;
    image: string;
    height: number;
    type: Array<PokemonType>;
    stats: PokemonStats;
}

export interface PokemonStats {
    attack: number;
    defence: number;
    xAttack: number;
    xDefence: number;
    speed: number;
}
export interface NamedAPIResource {
    /** The name of the referenced resource */
    name: string;
    /** The URL of the referenced resource */
    url: string;
}

export interface PokemonType {
  /** The order the Pokémon's types are listed in */
  slot: number;
  /** The type the referenced Pokémon has */
  type: NamedAPIResource;
}

export interface PokemonState {
    pokemons: Array<PokemonData>;
    found: Array<PokemonData>;
    selected: Array<PokemonData>;
    status: 'idle' | 'loading' | 'failed';
    detail: PokemonData | undefined;
}