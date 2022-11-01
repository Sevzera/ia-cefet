import Individual from "./individual.js";

const N = 100;

const fitnessFunction = (x, y) => {
	return (
		Math.sin(x) * Math.exp((1 - Math.cos(y)) ** 2) +
		Math.cos(y) * Math.exp((1 - Math.sin(x)) ** 2) +
		(x - y) ** 2
	).toFixed(2);
};
const linearMappingFunction = (i) => {
	const max = 100;
	const min = 0;
	return min + (max - min) * ((N - i) / (N - 1)).toFixed(2);
};

let population = [];

for (let i = 0; i < N; i++) {
	population.push(
		new Individual(
			(Math.random() * 20 - 10).toFixed(2),
			(Math.random() * 20 - 10).toFixed(2)
		)
	);
	population[i].calculateFitness(fitnessFunction);
}

population.sort((a, b) => {
	return a.fitness - b.fitness;
});
for (let i = 0; i < N; i++) {
	population[i].calculateMappedFitness(linearMappingFunction, i + 1);
}

population.forEach((individual) => {
	console.log(individual.toString());
});
