const { exit } = require('process');
const prompt = require('prompt');
let answer_sheet = require('../const/Apprentice_TandemFor400_Data.json');
const colors = require('colors');


// devTimer is the timer used between instructions to quicken development 
const devTimer = 500

//modify default prompt props
prompt.message = ("");
prompt.delimiter = ("?");


//prompt.get props for specific prompts
const gotintro = [
	{
			name: 'Understand',
			type: "string",
			description:"yes to move on, no to repeat",
			validator: /^[nNyY]$/,
			warning: 'Y or n only, Yes to move on, No to stay and reread'.yellow,
			default: "y"
	},
];
const menu = [
	{
			name: 'Selection',
			type: "string",
			description:"menu chouces",
			validator: /^[eEqQsSiI]$/,
			warning: 'E/e, Q/q, S/s, or I/i avaiable only.'.yellow,
			default: "i"
	},
];
const endgame = [
	{
		name: "Play again? y/n ".blue,
		validator: /^[nNyY]$/,
		warning: 'Y or n only, Yes to play again, no to exit'.yellow,
		default: "y"
	},
]


//console loged info
const welcome = "\tWelcome to Trivia\n".blue + 
	"A simple trivia fun time made in Javascript for you and your friends\n";

const instructions = [
	welcome,
	"A round of trivia has " +  "10".red.underline +  " questions.",
	"All questions have multiple-choice answers.",
	"To view the list of questions, go to the 'Main Menu' and use " + 'q/Q'.blue +  " to view.",
	"Default selection is 'a/A' if no answer is given.",
	"After each question you submit, you will be shown the correct answer.",
	"At the end of the round your score will be given.",
	"Good luck and have fun.",
	"Did you get all that? " + "Y/y".green + " : " + "N/n".red
];

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
 */
 
function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
	}
	return a;
}


/**
 * exits on error.
 * @param {Error} err to be logged.
 */

const EXIT_ON_ERR = (err) => {
	console.error(err)
	exit();
}

/**
 * Given a prompt.get(..., (err, result) ).
 * @param {JSON/Object} result any given result specifier to return the key value.
 */

const getPromptResponse = (result) => {
	const key = Object.keys(result);
	return (result[key]);
}


/**
 * class TriviaGame 
 * State managed game controller to handle logic
 * can be migrated to React very easily.
 * showResults() / nextQuestion() / begin() / intro() /
 * getQuestions() / menu() /  runItBack()
 */

class TriviaGame {
	constructor(){
		this.score = 0;

		shuffle(answer_sheet);
		this.intro();
	}

	showResults = () => {
		if (this.score == 100){
			console.log(`Your score is: `+`${this.score}`.green.underline);
			console.log("You really dont look that smart, who knew?")
		}
		else if (this.score > 70)
		{
			console.log(`Your score is: `+`${this.score}`.green);
			console.log("Functioning member of society.")
		}
		else if (this.score > 40){
			console.log(`Your score is: `+`${this.score}`.yellow);
			console.log("D's get degrees.");
		}
		else {
			console.log(`Your score is: `+`${this.score}`.red);
			console.log("Your mother is still proud of you <3.");
		}
		prompt.get(endgame, (error, result) => {
			if (error) { EXIT_ON_ERR(error)}
			const key = getPromptResponse(result);
			if (key.includes('y') || key.includes('Y')){
				this.menu();
			}
			else {
				console.log("Thanks for playing".blue);
				exit();
			}

		})
	}

	nextQuestion = (index) => {
		if (index >= 10){
			this.showResults();
		}
		else{
			let answer_choices = shuffle(answer_sheet[index].incorrect.concat(answer_sheet[index].correct))
			const len = answer_choices.length;
			const alpha = "abcdefghijklmnopqrstuvwxyz";
			const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			let choices = alpha.slice(0,len) + ALPHA.slice(0, len);
			let choice_string = "";
			console.log("\n" + `${index + 1}? `.green + answer_sheet[index].question);
			answer_choices.map((choice, i) => {
				choice_string += `| ${choices[i]}/${choices[i + len]}  `.blue + choice + " |\t".blue 
			})
			console.log(choice_string);
			var regs = new RegExp(`^[${choices}]{1}$`);
			const question_properties = {
				name: "answer",
				validator: regs,
				warning: `${choices} avaiable only.`.yellow,
				default: 'a'
			}
			prompt.get(question_properties, (err, res) => {
				if (err) { return EXIT_ON_ERR(err)}
				else {
					const response = getPromptResponse(res);
					if (answer_choices[choices.indexOf(response.toLowerCase())] == answer_sheet[index].correct){
						console.log("Correct! ".green, answer_sheet[index].correct.green)
						this.score += 10;
					}
					else{
						console.log("Your response " + answer_choices[choices.indexOf(response.toLowerCase())].red + " is incorrect.")
						console.log("The correct response: " + answer_sheet[index].correct.green)
					}
					this.nextQuestion(index + 1);
				}
			})
			
			
		}
	}



	begin = () => {
		let		index = 0;

		console.clear();
		shuffle(answer_sheet); 
		console.log("Shuffling the questions...".green);
		this.nextQuestion(index);
		// give example question 
		// go over answering and such, allow for user to look at questions.
	}

	intro = () =>  {
		const timer = devTimer ? devTimer : 3000 ;
		console.clear();
		instructions.map((instruction, index) => {
			setTimeout(() => {console.log(instruction)}, index * timer );
		});
		this.runItBack();
	
	}

	runItBack = () => {
		setTimeout(() => {
			prompt.get(gotintro, (err, result) => {
				if (err) { EXIT_ON_ERR(err) }
				const key = getPromptResponse(result);
				if (key.includes("n") || key.includes("N")){
					this.intro();
				}
				else { this.menu(); } // move to the next step
			} ); }, devTimer * instructions.length);
	
	}



	getQuestions = () => {
		const len = answer_sheet.length;
		answer_sheet.map((obj, index) => {
			if (index + 1 == len){
				console.log(`${index + 1}`.green + ": ".green + obj['question']);
			}
			else{
				console.log(`${index + 1}`.green + ": ".green + obj['question'] + "\n");
			}
		})
		prompt.get({}, () =>{
			this.menu();
		})
	}

	menu = () => {
		console.clear();
		this.score = 0;
		console.log("\tMain Menu".brightWhite);
		console.log("'s/S' to start".brightWhite);
		console.log("'i/I' to view intro".brightWhite);
		console.log("'q/Q' to view questions".brightWhite);
		console.log("'e/E' to exit".brightWhite);
		prompt.get(menu, (err, result) => {
			if (err) {  EXIT_ON_ERR(err)}
			if (getPromptResponse(result).includes("q") || getPromptResponse(result).includes("Q")){
				this.getQuestions();
			}
			else if (getPromptResponse(result).includes("s") || getPromptResponse(result).includes("S")){
				this.begin();
			}
			else if (getPromptResponse(result).includes("e") || getPromptResponse(result).includes("E")){
				console.clear();
				console.log("Goodbye".blue);
				exit();
			}
			else if (getPromptResponse(result).includes("i" || getPromptResponse(result).includes("I"))){
				this.intro();
			}
			
		})
	}
};


prompt.start();
console.clear();
new TriviaGame();