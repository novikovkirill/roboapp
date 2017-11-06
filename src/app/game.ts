import { Field } from './field';
import { Cell } from './cell';

export class Game {
  cellsConfig: string;
  robotPower: number;
  commands: string;
  field: Field;

  public getCommands() :void {
  	if (this.cellsConfig){
      const cellsConfig = this.cellsConfig.replace(/\n/g, '');
		  if (Math.sqrt(cellsConfig.length) != Math.floor(Math.sqrt(cellsConfig.length))) 
  			alert('Игровое поле должно быть квадратным!');
  		else if (cellsConfig.replace(/[.#ST]/g, '') != '')
  			alert('Игровое поле должно задаваться только символами S,T,. и #');
  		else if (!cellsConfig.includes('S') || !cellsConfig.includes('T'))
  			alert('Не задана начальная или конечная точка маршрута!');
  		else if (cellsConfig.match(/S/g).length > 1 || cellsConfig.match(/T/g).length > 1)
  			alert('Должна быть только одна начальная и конечная точка!');
  		else if (!this.robotPower || isNaN(+this.robotPower) || +this.robotPower < 0)
  			alert('Некорректно задан запас энергии!')
  		else {
  			this.field = new Field(this.makeCellsArrayFromConfigString(), +this.robotPower);
  		}
  	}
  	else {
  		alert('Не задана конфигурация игрового поля!');
  	}
  }

  private makeCellsArrayFromConfigString() : Cell[][] {
  	let cells = [];
    const cellsConfig = this.cellsConfig.replace(/\n/g, '');
  	const dimension = Math.sqrt(cellsConfig.length);
  	for (let i = 0; i < dimension; i++){
  		let cellsRow = [];
  		for (let j = 0; j < dimension; j++)
  			cellsRow.push(new Cell(cellsConfig[i*dimension+j]))
  		cells.push(cellsRow);
  	}
  	return cells;
  }
}