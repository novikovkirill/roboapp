export class Cell{

	private visited: boolean;
	private distance: number;
	private robotDirection: string;
	private path : string;
	private marked : boolean;

	constructor(public type: string) { 
		this.visited = false;
		this.distance = this.type == 'S' ? 0 : Infinity;
		if (this.type == 'S'){
			this.robotDirection = 'n';
		}
		this.path = '';
	}

	getDirection() {
		return this.robotDirection;
	}

	getDistance() {
		return this.distance;
	}

	getPath() {
		return this.path;
	}

	getType() {
		return this.type;
	}

	getVisited(){
		return this.visited;
	}

	mark() : void{
		this.marked = true;
	}

	setDistance(distance: number){
		this.distance = distance;
	}

	setDirection(direction: string){
		this.robotDirection = direction;
	}

	setPath(path: string){
		this.path = path;
	}

	setVisited(visited: boolean){
		this.visited = visited;
	}

}