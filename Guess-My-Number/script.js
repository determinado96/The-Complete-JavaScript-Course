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

checkBtn.addEventListener("click", function () {
  const guess = Number(guessInput.value);

  if (!guess) {
    displayMessage("⛔ No number!");
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct Number!");
    displaySecretNumber(secretNumber);
    updateBackgroundColor("#60b347");
    numberElement.style.width = "30rem";

    if (score > highscore) {
      highscore = score;
      highscoreElement.textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      decreaseScore();
    } else {
      displayMessage("💥 You lost the game!");
      labelScore.textContent = 0;
      updateBackgroundColor("#ff0000");
    }
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
});
