import { Component, Input } from '@angular/core';

import  { Game } from './game';

@Component({
  selector: 'game-config',
  templateUrl: 'game-config/game-config.component.html',
  styleUrls: ['game-config/game-config.component.css']
})

export class GameConfigComponent {
	@Input() game: Game
}
