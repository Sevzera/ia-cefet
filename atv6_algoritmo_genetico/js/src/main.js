import Individual from "./individual.js";

const N = 100;
const Nsum = 5050;

const crossover = (alpha, firstParent, secondParent) => {
  const x = (alpha * firstParent.x + (1 - alpha) * secondParent.x).toFixed(5);
  const y = (alpha * firstParent.y + (1 - alpha) * secondParent.y).toFixed(5);

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

while (n < 2000) {
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
      const alpha = Math.random();
      children[i] = crossover(alpha, pairs[i], pairs[i + 1]);
      children[i + 1] = crossover(alpha, pairs[i + 1], pairs[i]);
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

  // if (n % 10 === 0)
  // 	console.log(
  // 		`Melhor candidato da geração ${n}:`,
  // 		population[0].x,
  // 		population[0].y
  // 	);
  n++;
}
console.log(population);
// console.log(
// 	"Melhor candidato da última geração:",
// 	population[0].x,
// 	population[0].y
// );
