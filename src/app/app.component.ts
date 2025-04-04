import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import PokeService from './services/poke.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokedex-plus';
}