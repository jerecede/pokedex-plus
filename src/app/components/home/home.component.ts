import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ListPokemonComponent } from '../list-pokemon/list-pokemon.component';
import { Pokemon } from '../../model/pokemon';
import PokeService from '../../services/poke.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ListPokemonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  pokemons: Pokemon[] = [];

  pokeService: PokeService = inject(PokeService);

  constructor() {
    this.pokeService.getPokemonData().then(data => {
      this.pokemons = data;
    })
  }
}
