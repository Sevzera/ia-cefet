export default class Individual {
	constructor(x, y) {
		this.x = Number(x);
		this.y = Number(y);
		this.fitness = null;
		this.mappedFitness = null;
	}

	calculateFitness(fitnessFunction) {
		this.fitness = Number(fitnessFunction(this.x, this.y));
	}

	calculateMappedFitness(linearMappingFunction, i) {
		this.mappedFitness = Number(linearMappingFunction(i));
	}

	toString() {
		return `x: ${this.x}, y: ${this.y}, fitness: ${this.fitness}, mappedFitness: ${this.mappedFitness}`;
	}
}
