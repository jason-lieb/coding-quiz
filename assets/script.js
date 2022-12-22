// Global
let time = 0;
let questionIndex;
let currentQuestion;
let highscores;

// Query Selectors
let main = document.querySelector('main');
let timer = document.querySelector('#timer');

// Initialize
init();

// Functions
function init() {
  getHighScores();
}

function getHighScores() {
  storedScores = window.localStorage.getItem('highscores');
  if (storedScores === null) {
    highscores = [];
  } else {
    highscores = storedScores;
  }
}

function startQuiz() {
  // start timer
  // load first question

  // setInterval(intervalFunction, 1000);
  // function intervalFunction() {
  //   console.log('hello');
  // }
}

function startTimer() {

}

function clearMain() {
  main.innerHTML = '';
}

function nextQuestion() {
  if (questionIndex === undefined) {
    questionIndex = 0;
  } else {
    questionIndex++;
  }
  let currentQuestion = questions[questionIndex];
}

function createQuestionHTML() {
  let questionDiv = document.createElement('div');
  questionDiv.setAttribute('class', 'question');
  let h2 = document.createElement('h2');
  h2.textContent = currentQuestion.prompt;
  questionDiv.appendChild(h2);
  for (let i = 0; i < 4; i++) {
    let optionBtn = document.createElement('input');
    optionBtn.setAttribute('type', 'button');
    optionBtn.setAttribute('data-answerNum', i);
    optionBtn.textContent = currentQuestion.options[i];
    questionDiv.appendChild(optionBtn);
  }
}

function displayCorrectness() {
  // Add DOM statement
  // Decrease timer by 10 if incorrect
}

function endQuiz() {


  // HTML to Create
  // <h2>All done!</h2>
  // <p>Your final score is <span></span>.</p>
  // <p>Enter initials:</p>
  // <input type="text">
  // <input type="button" value="Submit">
}

function setHighScore() {

}

function clearHighScores() {
  window.localStorage.clear();
}

// Create Questions
class Question {
  constructor(prompt, options, answer) {
    this.prompt = prompt;
    this.options = options;
    this.answer = answer;
  }
  check(option) {
    return option === answer;
  }
}

let q1prompt = 'Commonly used data types DO NOT include:'
let q2prompt = 'The condition in an if / else statement is enclosed with ______.';
let q3prompt = 'Arrays in JavaScript can be used to store ______.';
let q4prompt = 'String values must be enclosed within ______ when being assigned to variables.';
let q5prompt = 'A very useful tool used during development and debugging for printing content to the debugger is:';

let q1options = ['strings', 'booleans', 'alerts', 'numbers'];
let q2options = ['quotes', 'curly brackets', 'parenthesis', 'square brackets'];
let q3options = ['numbers and strings', 'other arrays', 'booleans', 'all of the above'];
let q4options = ['commas', 'curly brackets', 'quotes', 'parenthesis'];
let q5options = ['JavaScript', 'terminal/bash', 'for loops', 'console.log'];

let q1answer = 2;
let q2answer = 2;
let q3answer = 3;
let q4answer = 2;
let q5answer = 3;

let question1 = new Question(q1prompt, q1options, q1answer);
let question2 = new Question(q2prompt, q2options, q2answer);
let question3 = new Question(q3prompt, q3options, q3answer);
let question4 = new Question(q4prompt, q4options, q4answer);
let question5 = new Question(q5prompt, q5options, q5answer);

let questions = [question1, question2, question3, question4, question5];