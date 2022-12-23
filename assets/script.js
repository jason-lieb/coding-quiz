// Global
let time = 75;
let timerFunction;
let questionIndex;
let currentQuestion;
let highscores;
let quizFinished = false;

// Query Selectors
let body = document.querySelector('body');
let main = document.querySelector('main');
let timer = document.querySelector('#timer');
let scoreList = document.querySelector('ol');

// Initialize
init();

// Functions
function init() {
  getHighScores();
  if (scoreList !== null) {
    createHighScoreHTML();
  }
}

function getHighScores() {
  storedScores = JSON.parse(window.localStorage.getItem('highscores'));
  if (storedScores === null) {
    highscores = [];
  } else {
    highscores = storedScores;
  }
}

function startQuiz() {
  startTimer();
  nextQuestion();
}

function startTimer() {
  timerFunction = setInterval(() => {
    if (time > 0 && quizFinished === true) {
      clearInterval(timerFunction);
      return;
    }
    if (time === 0) {
      clearInterval(timerFunction);
      endQuiz();
      return;
    }
    time--;
    updateTime();
  }, 1000);
}

function updateTime() {
  timer.textContent = time;
}

function nextQuestion(event) {
  if (questionIndex !== undefined) checkCorrectness(event);
  if (questionIndex === undefined) {
    questionIndex = 0;
  } else if (questionIndex === questions.length - 1) {
    quizFinished = true;
    endQuiz();
    return;
  } else {
    questionIndex++;
  }
  currentQuestion = questions[questionIndex];
  clearMain();
  createQuestionHTML();
}

function clearMain() {
  main.innerHTML = '';
}

function createQuestionHTML() {
  let questionDiv = document.createElement('div');
  questionDiv.className = 'question container';
  let h2 = document.createElement('h2');
  h2.textContent = currentQuestion.prompt;
  questionDiv.appendChild(h2);
  for (let i = 0; i < 4; i++) {
    let optionBtn = document.createElement('input');
    optionBtn.setAttribute('type', 'button');
    optionBtn.className = 'option';
    optionBtn.setAttribute('data-answernum', i);
    optionBtn.setAttribute('value', currentQuestion.options[i]);
    optionBtn.onclick = nextQuestion;
    questionDiv.appendChild(optionBtn);
  }
  main.appendChild(questionDiv);
}

function checkCorrectness(event) {
  let correctness = event.target.dataset.answernum === currentQuestion.answer;
  if (correctness === false && time > 10) {
    time -= 10;
    updateTime();
  } else if (correctness === false) {
    time = 0;
    updateTime();
    endQuiz();
  }
  displayCorrectness(correctness);
}
///////////////////////////////////////////////////////////// Disable buttons until correctness disappears

function displayCorrectness(correctness) {
  let message;
  if (correctness === true) {
    message = 'Correct!';
  } else {
    message = 'Wrong!';
  }
  let h4 = document.createElement('h4');
  h4.textContent = message;
  body.appendChild(h4);
  ////////////////////////////////////////////////////////////////// container underlined
  setTimeout(() => {
    body.removeChild(h4);
  }, 1000);
}

function endQuiz() {
  clearMain();
  createEndPage();
}

function createEndPage() {
  let end = document.createElement('div');
  end.className = 'end container';
  let h3 = document.createElement('h3');
  h3.textContent = 'All done!';
  end.appendChild(h3);
  let p1 = document.createElement('p');
  let finalScoreStatement = `Your final score is ${time}.`;
  p1.textContent = finalScoreStatement;
  end.appendChild(p1);
  let p2 = document.createElement('p');
  p2.textContent = 'Enter initials:';
  end.appendChild(p2);
  let initials = document.createElement('input');
  initials.setAttribute('type', 'text');
  initials.setAttribute('id', 'initials')
  end.appendChild(initials);
  let submit = document.createElement('input');
  submit.setAttribute('type', 'button');
  submit.setAttribute('value', 'Submit');
  submit.onclick = setHighScore;
  end.appendChild(submit);
  main.appendChild(end);
}

function setHighScore() {
  let initials = document.querySelector('#initials').value;
  let finalScore = new FinalScore(initials, time);
  highscores = [...highscores, finalScore];
  editHighScores();
  try {
    window.localStorage.setItem('highscores', JSON.stringify(highscores));
  } catch (exception) {
    return false
  }
  window.location.href = './highscores.html';
}

function editHighScores() {
  highscores = highscores.sort((a, b) => b.score - a.score)
  if (highscores.length > 10) highscores.pop();
}

function createHighScoreHTML() {
  for (let i = 0; i < highscores.length; i++) {
    let scoreElement = document.createElement('li');
    let { initials, score } = highscores[i];
    scoreElement.textContent = `${initials} - ${score}`;
    scoreList.appendChild(scoreElement);
  }
}

function clearHighScores() {
  window.localStorage.clear();
}

// Classes
class FinalScore {
  constructor(initials, score) {
    this.initials = initials;
    this.score = score;
  }
}
class Question {
  constructor(prompt, options, answer) {
    this.prompt = prompt;
    this.options = options;
    this.answer = answer;
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

let q1answer = '2';
let q2answer = '2';
let q3answer = '3';
let q4answer = '2';
let q5answer = '3';

let question1 = new Question(q1prompt, q1options, q1answer);
let question2 = new Question(q2prompt, q2options, q2answer);
let question3 = new Question(q3prompt, q3options, q3answer);
let question4 = new Question(q4prompt, q4options, q4answer);
let question5 = new Question(q5prompt, q5options, q5answer);

let questions = [question1, question2, question3, question4, question5];