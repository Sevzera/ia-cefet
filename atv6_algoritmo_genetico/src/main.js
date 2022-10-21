import Chromosome from "./chromosome.js";

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
	return (min + (max - min) * ((N - i) / (N - 1))).toFixed(2);
};

let chromosomes = [];
for (let i = 0; i < N; i++) {
	chromosomes.push(
		new Chromosome(
			(Math.random() * 20 - 10).toFixed(2),
			(Math.random() * 20 - 10).toFixed(2)
		)
	);
	chromosomes[i].calculateFitness(fitnessFunction);
}

chromosomes.sort((a, b) => {
	return a.fitness - b.fitness;
});
for (let i = 0; i < N; i++) {
	chromosomes[i].calculateMappedFitness(linearMappingFunction, i + 1);
}

chromosomes.forEach((chromosome) => {
	console.log(chromosome.toString());
});
