import readlineSync from "readline-sync";

export const consoleInput = (question) => {
	let result = readlineSync.question(question);
	let asciiPrevA = 64;
	result = result.toUpperCase().charCodeAt(0) - asciiPrevA;
	return result;
};
