import readline from "readline";
const input = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let finalIndex;
input.question("Digite o índice final: ", (answer) => {
	finalIndex = parseInt(answer);
	input.close();
});
