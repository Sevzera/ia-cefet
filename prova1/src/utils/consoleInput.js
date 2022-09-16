import readlineSync from "readline-sync";

export const consoleInput = (question) => {
	let result = readlineSync.question(question);
	return result;
};
