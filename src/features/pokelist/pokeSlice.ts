import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { PokemonData, PokemonState } from '../../reusable/PokemonInterfaces';
import { fetchInitialPokemons } from './pokeApi';

const initialState: PokemonState = {
    status: 'idle',
    pokemons: [],
    found: [],
    selected: [],
    detail: undefined,
}

export const pokemonSlice = createSlice({
    name: 'pokelist',
    initialState,
    reducers: {
        addPokemon: (state, action) => {
            if (state.selected.length < 6){
                const isSelected = state.selected.findIndex((select) => select.id === action.payload);
                if (isSelected < 0) {
                    const found = state.pokemons.find((poke) => poke.id === action.payload);
                    if (found) {
                        state.selected.push(found);
                    }
                }
            }
        },
        removePokemon: (state, action) => {
            state.selected = state.selected.filter((element) => {return element.id !== action.payload})
        },
        searchResults: (state, action) => {
            state.found = action.payload;
        },
        showDetails: (state, action) => {
            const details = state.pokemons.find((select) => select.id === action.payload);
            state.detail = details;
        },
        clearDetails: (state) => {
            state.detail = undefined;
        }
    },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPokemons.fulfilled, (state, action) => {
        state.status = 'idle';
        state.pokemons = action.payload;
        state.found = action.payload;
      })
      .addCase(fetchAllPokemons.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const fetchAllPokemons = createAsyncThunk(
    'poke/fetchPokemons',
    async () => {
      const response = await fetchInitialPokemons() as PokemonData[];
      return response;
    }
);

export const searchPokemons =
  (searchText: string): AppThunk =>
  (dispatch, getState) => {
    const pokemons = pokemonList(getState());
    const searchNumber = Number.parseInt(searchText);
    if (!isNaN(searchNumber)) {
        const foundById = pokemons.filter((poke) => poke.id === searchNumber);
        dispatch(searchResults(foundById));
    } else {
        const foundById = pokemons.filter((poke) => poke.name.indexOf(searchText) >= 0);
        dispatch(searchResults(foundById));
    }
  };

export const { addPokemon, removePokemon, searchResults, showDetails, clearDetails } = pokemonSlice.actions;
export const pokemonList = (state: RootState) => state.poke.pokemons;

export default pokemonSlice.reducer;