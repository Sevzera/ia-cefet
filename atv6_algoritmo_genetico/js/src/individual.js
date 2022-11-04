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
		const localSearch = 0.1;
		if (Math.random() < 0.05) {
			const xNeg = this.x - (this.x*localSearch);
			const xPos = this.x + (this.x*localSearch)
			this.x = Math.random() * (xPos - xNeg + 1) + xNeg
		}
		if (Math.random() < 0.05) {
			const yNeg = this.y - (this.y*localSearch);
			const yPos = this.y + (this.y*localSearch)
			this.y = Math.random() * (yPos - yNeg + 1) + yNeg
		}
	}

	toString() {
		return `x: ${this.x}, y: ${this.y}, fitness: ${this.fitness}, mappedFitness: ${this.mappedFitness}`;
	}
}
