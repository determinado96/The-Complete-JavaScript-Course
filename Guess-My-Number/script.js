"use strict";

// Game state
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// Cache / references (pointers) to DOM elements
const body = document.querySelector("body");
const guessInput = document.querySelector(".guess");
const message = document.querySelector(".message");
const labelScore = document.querySelector(".score");
const numberElement = document.querySelector(".number");
const highscoreElement = document.querySelector(".highscore");
const checkBtn = document.querySelector(".check");
const againBtn = document.querySelector(".again");
const guessHistoryElement = document.querySelector(".guess-history");
const guessHistoryListElement = document.querySelector(".guess-history-list");
const guessHistoryList = [];

// UI functions
const displayMessage = function (msg) {
  message.textContent = msg;
};

const updateScoreLabel = function (newScore) {
  labelScore.textContent = newScore;
};

const decreaseScore = function () {
  score--;
  updateScoreLabel(score);
};

const updateBackgroundColor = function (color) {
  body.style.backgroundColor = color;
};

const displaySecretNumber = function (number) {
  numberElement.textContent = number;
};

const addGuessToHistory = function (guess) {
  guessHistoryList.push(guess);
  guessHistoryListElement.textContent = guessHistoryList.join(", ");
  guessHistoryElement.style.display = "block";
};

const toogleCheckBtn = function(value) {
  checkBtn.disabled = value;
}

checkBtn.addEventListener("click", function () {
  const guess = Number(guessInput.value);

  if (!guess) {
    displayMessage("⛔ No number!");
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct Number!");
    displaySecretNumber(secretNumber);
    updateBackgroundColor("#60b347");
    numberElement.style.width = "30rem";
    addGuessToHistory(guess);
    if (score > highscore) {
      highscore = score;
      highscoreElement.textContent = highscore;
    }
    toogleCheckBtn(true);
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      decreaseScore();
    } else {
      displayMessage("💥 You lost the game!");
      labelScore.textContent = 0;
      updateBackgroundColor("#ff0000");
      toogleCheckBtn(true);
    }
    addGuessToHistory(guess);
  }
});

document.querySelector(".again").addEventListener("click", function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  guessInput.value = "";
  displayMessage("Start guessing...");
  updateScoreLabel(score);
  displaySecretNumber("?");
  updateBackgroundColor("#222");

  guessHistoryList.length = 0;
  guessHistoryListElement.textContent = "";
  guessHistoryElement.style.display = "none";

  toogleCheckBtn(false);
});
