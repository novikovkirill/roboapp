import { Cell } from './cell';

export class Field {

	public path: string;
	private directions : string[];
	public commands: string[];

	constructor(public cells: Cell[][], private power) { 
		this.directions = ['n','r','s','l'];
		this.path = this.getPath();
		if (this.path.length){
			this.markPath();
			this.setCommands();
		}
	}

	//для рассчёта используется алгоритм Дейкстры
	private getPath() : string{
		let minCell = this.getMinCell();
		let counter = 0;
		while (minCell && minCell.getType() != 'T' && minCell.getDistance() < this.power && counter < 55){
			minCell = this.getMinCell();
			this.markCellsInterlinked(minCell);
			counter++;
		}
		if (minCell.getDistance() === Infinity){
			alert('Путь заблокирован!');
			return '';
		}
		else if (minCell.getDistance() >= this.power && minCell.getType() != 'T'){
			alert('Недостаточно энергии!');
			return ''; 
		}
		else return minCell.getPath();
	}

	private getMinCell(){
		let minCell;
		const minReduce = ( acc, cur ) => (acc.getDistance() < cur.getDistance() ? acc : cur);
		for (const cellsRow of this.cells){
			const unVisitedCells = cellsRow.filter(function(cell){
				return cell.getVisited() == false && cell.getType() != '#';
			});
			if (unVisitedCells.length){
				const minCellInRow = unVisitedCells.reduce(minReduce);
				if (!minCell || minCellInRow.getDistance() < minCell.getDistance()){
					minCell = minCellInRow;
				}
			}
			if (minCell && minCell.getDistance() == 0) break;
		}
		return minCell;
	}

	private getStartCellIndexes(){
		for (const cellsRow of this.cells){
			const startCellIndex = cellsRow.findIndex(function(cell){
				return cell.getType() == 'S';
			})
			if (startCellIndex != -1) return [this.cells.indexOf(cellsRow), startCellIndex];
		}
	}

	private markCellsInterlinked(cell : Cell){
		for (const cellsRow of this.cells){
		 	if (cellsRow.includes(cell)){
		 		let rowIndex = this.cells.indexOf(cellsRow);
		 		let colIndex = cellsRow.indexOf(cell);
		 		if (rowIndex != 0){
		 			const cellInterlinked = this.cells[rowIndex - 1][colIndex];
		 			if (cellInterlinked.getVisited() == false && cellInterlinked.getType() != '#'){
		 				let newDistance = cell.getDistance(), newPath = cell.getPath();
			 			switch (cell.getDirection()) {
			 				case 'n':
			 					newDistance += 1;
			 					newPath += 'f';
			 					break;
			 				case 'l':
			 					newDistance += 2;
			 					newPath += 'rf';
			 					break;
			 				case 'r':
			 					newDistance += 2;
			 					newPath += 'lf';
			 					break;			 					
			 				case 's':
			 					newDistance += 3;
			 					newPath += 'llf'
			 			}
			 			if (newDistance < cellInterlinked.getDistance()){
			 				cellInterlinked.setDistance(newDistance);
			 				cellInterlinked.setPath(newPath);
			 				cellInterlinked.setDirection('n');
			 			}
			 		}
		 		}
		 		if (rowIndex != this.cells.length - 1){
		 			const cellInterlinked = this.cells[rowIndex + 1][colIndex];
		 			if (cellInterlinked.getVisited() == false && cellInterlinked.getType() != '#'){
		 				let newDistance = cell.getDistance(), newPath = cell.getPath();
			 			switch (cell.getDirection()) {
			 				case 's':
			 					newDistance += 1;
			 					newPath += 'f';
			 					break;
			 				case 'l':
			 					newDistance += 2;
			 					newPath += 'lf';
			 					break;
			 				case 'r':
			 					newDistance += 2;
			 					newPath += 'rf';
			 					break;			 					
			 				case 'n':
			 					newDistance += 3;
			 					newPath += 'llf'
			 			}
			 			if (newDistance < cellInterlinked.getDistance()){
			 				cellInterlinked.setDistance(newDistance);
			 				cellInterlinked.setPath(newPath);
			 				cellInterlinked.setDirection('s');
			 			}
			 		}
		 		}
		 		if (colIndex != 0){
		 			const cellInterlinked = this.cells[rowIndex][colIndex - 1];
		 			if (cellInterlinked.getVisited() == false && cellInterlinked.getType() != '#'){
		 				let newDistance = cell.getDistance(), newPath = cell.getPath();
			 			switch (cell.getDirection()) {
			 				case 'l':
			 					newDistance += 1;
			 					newPath += 'f';
			 					break;
			 				case 'n':
			 					newDistance += 2;
			 					newPath += 'lf';
			 					break;
			 				case 's':
			 					newDistance += 2;
			 					newPath += 'rf';
			 					break;			 					
			 				case 'r':
			 					newDistance += 3;
			 					newPath += 'llf'
			 			}
			 			if (newDistance < cellInterlinked.getDistance()){
			 				cellInterlinked.setDistance(newDistance);
			 				cellInterlinked.setPath(newPath);
			 				cellInterlinked.setDirection('l');
			 			}
			 		}
		 		}
		 		if (colIndex != this.cells.length - 1){
		 			const cellInterlinked = this.cells[rowIndex][colIndex + 1];
		 			if (cellInterlinked.getVisited() == false && cellInterlinked.getType() != '#'){
		 				let newDistance = cell.getDistance(), newPath = cell.getPath();
			 			switch (cell.getDirection()) {
			 				case 'r':
			 					newDistance += 1;
			 					newPath += 'f';
			 					break;
			 				case 'n':
			 					newDistance += 2;
			 					newPath += 'rf';
			 					break;
			 				case 's':
			 					newDistance += 2;
			 					newPath += 'lf';
			 					break;			 					
			 				case 'l':
			 					newDistance += 3;
			 					newPath += 'llf';
			 					break;
			 			}
			 			if (newDistance < cellInterlinked.getDistance()){
			 				cellInterlinked.setDistance(newDistance);
			 				cellInterlinked.setPath(newPath);
			 				cellInterlinked.setDirection('r');
			 			}
			 		}
		 		}
		 		cell.setVisited(true);
		 		break;
		 	}
		}
	}

	private markPath(){
		let direction = 'n';
		let [currentRowIndex, currentColIndex] = this.getStartCellIndexes();
		this.cells[currentRowIndex][currentColIndex].mark();
		let path = this.path;
		while (path.length){
			switch (path[0]) {
				case 'r':
					direction = this.directions[(this.directions.findIndex((el) => el == direction) + 1) % this.directions.length];
					break;
				case 'l':
					direction = this.directions[(this.directions.findIndex((el) => el == direction) - 1 + this.directions.length) % this.directions.length];
					break;
				case 'f':
					switch (direction) {
						case 'n':
							currentRowIndex--;
							break;
						case 's':
							currentRowIndex++;
							break;
						case 'l':
							currentColIndex--;
							break;
						case 'r':
							currentColIndex++;
					}
					this.cells[currentRowIndex][currentColIndex].mark();
					break;
			}
			path = path.slice(1);
		}
	}

	private setCommands(){
		this.commands = [];
		for (let i = 0; i < this.path.length; i++){
			switch (this.path[i]) {
				case 'r':
					this.commands.push('Повернуть направо');
					break;
				case 'l':
					this.commands.push('Повернуть налево');
					break;
				case 'f':
					this.commands.push('Проехать вперёд');
					break;
			}
		}
	}
}