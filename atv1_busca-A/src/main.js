import readline from 'readline';
const input = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const finalIndex = input.question('Digite o índice final: ', (answer) => {
    return parseInt(answer);
});

console.log(finalIndex);