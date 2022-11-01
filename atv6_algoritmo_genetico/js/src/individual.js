export default class Individual {
	constructor(x, y) {
		this.x = Number(x);
		this.y = Number(y);
		this.fitness = this.calculateFitness();
		this.mappedFitness = null;
	}

	calculateFitness() {
		return Number(
			(
				Math.sin(this.x) * Math.exp((1 - Math.cos(this.y)) ** 2) +
				Math.cos(this.y) * Math.exp((1 - Math.sin(this.x)) ** 2) +
				(this.x - this.y) ** 2
			).toFixed(2)
		);
	}

	tryToMutate() {
		if (Math.random() < 0.005) {
			this.x = Number((Math.random() * 20 - 10).toFixed(5));
		}
		if (Math.random() < 0.005) {
			this.y = Number((Math.random() * 20 - 10).toFixed(5));
		}
	}

	toString() {
		return `x: ${this.x}, y: ${this.y}, fitness: ${this.fitness}, mappedFitness: ${this.mappedFitness}`;
	}
}
