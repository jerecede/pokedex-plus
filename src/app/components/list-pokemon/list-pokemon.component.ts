import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Pokemon } from '../../model/pokemon';

@Component({
  selector: 'app-list-pokemon',
  imports: [CommonModule, RouterModule],
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.scss'
})
export class ListPokemonComponent {
  @Input() pokemonRicevuto!: Pokemon;
}
