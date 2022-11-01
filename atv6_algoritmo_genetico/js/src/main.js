import Individual from "./individual.js";

const N = 100;
const Nsum = 5050;

const crossover = (mother, father) => {
	const motherXRate = Math.random();
	const fatherXRate = 1 - motherXRate;
	const x = (motherXRate * mother.x + fatherXRate * father.x).toFixed(5);

	const motherYRate = Math.random();
	const fatherYRate = 1 - motherXRate;
	const y = (motherYRate * mother.y + fatherYRate * father.y).toFixed(5);

	return new Individual(x, y);
};

let population = [];

for (let i = 0; i < N; i++) {
	population.push(
		new Individual(
			(Math.random() * 20 - 10).toFixed(5),
			(Math.random() * 20 - 10).toFixed(5)
		)
	);
}
population.sort((a, b) => {
	return a.fitness - b.fitness;
});
for (let i = 0; i < N; i++) {
	population[i].mappedFitness = N - i;
}

let children = [];
let n = 0;

while (n < 1000) {
	let pairs = [];
	for (let i = 0; i < N; i++) {
		const odd = Math.round(Math.random() * Nsum);
		let j;
		let sum = 0;
		for (j = 1; j < N; j++) {
			sum += j;
			if (sum >= odd) break;
		}
		pairs[i] = population.find((individual) => individual.mappedFitness === j);
		// console.log(pairs[i].mappedFitness, j);
	}

	for (let i = 0; i < N; i += 2) {
		if (Math.random() < 0.7) {
			children[i] = crossover(pairs[i], pairs[i + 1]);
			children[i + 1] = crossover(pairs[i], pairs[i + 1]);
		} else {
			children[i] = new Individual(pairs[i].x, pairs[i].y);
			children[i + 1] = new Individual(pairs[i + 1].x, pairs[i + 1].y);
		}
		children[i].tryToMutate();
		children[i + 1].tryToMutate();
	}

	children.sort((a, b) => {
		return a.fitness - b.fitness;
	});
	for (let i = 0; i < N; i++) {
		children[i].mappedFitness = N - i;
	}
	population = children;

	n++;
}
console.log(population[0]);
