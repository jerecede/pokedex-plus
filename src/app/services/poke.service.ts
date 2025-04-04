import { Injectable } from '@angular/core';
import { Pokemon } from '../model/pokemon';

@Injectable({
  providedIn: 'root'
})


export default class PokeService {
  static BASE_URL = "https://pokeapi.co/api/v2/";
  static POKE_URL = "pokemon/"
  static TYPE_URL = "type/"

  limit: number = 100;
  offset: number = 0;

  pokemons: Pokemon[] = [];

  constructor(){
    this.getPokemonData();
  }

  getPokemonData(): Promise<Pokemon[]> {
    const url = PokeService.BASE_URL + PokeService.POKE_URL + `/?offset=${this.offset}&limit=${this.limit}"`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        const requests = [];
        for (const pokemonInfo of data.results) {
          const pokemonUrl = pokemonInfo.url;
          const request = fetch(pokemonUrl)
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.log(err))
          requests.push(request);
        }
        return Promise.all(requests).then(pokemonsData => {

          let pokemons: Pokemon[] = [];

          for (const pokemonObj of pokemonsData) {

            let types: string[] = [];
            for (const element of pokemonObj.types) {
              const currentType = element.type.name;
              types.push(currentType);
            }

            let stats: number[] = [];
            for (const element of pokemonObj.stats) {
              const currentStat = element.base_stat;
              stats.push(currentStat);
            }

            const pokemon: Pokemon = {
              id: Number(pokemonObj.id),
              name: pokemonObj.name as string,
              img: pokemonObj.sprites.front_default as string,
              type: types,
              height: pokemonObj.height / 10,
              stats: stats
            }

            pokemons.push(pokemon);
          }
          
          this.pokemons = pokemons;

          return pokemons;
        });
        
      })
      .catch(err => {
        console.error(err)
        return [];
      })
  }

  nextPage() {
    if (this.offset + this.limit > 1300) {
      this.offset = 0;
    } else {
      this.offset += this.limit;
    }
    this.getPokemonData();
  }

  previousPage() {
    if (this.offset - this.limit < 0) {
      this.offset = 1300;
    } else {
      this.offset -= this.limit;
    }
    this.getPokemonData();
  }

  // getPokemonByType(type) {
  //   const url = PokeService.BASE_URL + PokeService.TYPE_URL + type;
  //   return fetch(url)
  //     .then(response => response.json())
  //     .then((data) => {
  //       const pokemonList = [];
  //       if (data && data.pokemon) {
  //         for (const entry of data.pokemon) {
  //           pokemonList.push(entry.pokemon);
  //         }
  //       } else {
  //         console.log(`No Pokémon found for type: ${type}`);
  //       }
  //       return pokemonList;
  //     })
  //     .then(pokemonList => {
  //       const requests = [];
  //       for (const pokemon of pokemonList) {
  //         const request = fetch(pokemon.url)
  //           .then(response => response.json())
  //           .then(data => data)
  //           .catch(err => console.log(err));
  //         requests.push(request);
  //       }
  //       return Promise.all(requests);
  //     })
  //     .catch(err => {
  //       console.log(`Error fetching Pokémon by type: ${err}`);
  //       return [];
  //     });
  // }

  getPokemonById(id: number) {
    const url = PokeService.BASE_URL + PokeService.POKE_URL + id;
    return fetch(url)
      .then(response => response.json())
      .then(data => data)
      .catch(err => console.log(err));
  }
}

