import words from "./data.js";

const randomtext = document.querySelector(".randomtext");
const input = document.querySelector(".input");
const result = document.querySelector(".result");
const timeEl = document.querySelectorAll(".time span");
const selectEl = document.querySelector("select");
const overlayEl = document.querySelector(".overlay");
const modalScore = document.querySelector(".modal-score");
const modalBtn = document.querySelector(".modal-btn");
const recordScore = document.querySelector(".modal-record");

let time = 5;
let count = 5;

selectEl.addEventListener("change", () => {
  if (selectEl.value === "qiyin") {
    count = 3;
  } else if (selectEl.value === "oson") {
    count = 5;
  } else if (selectEl.value === "murakkab") {
    count = 2;
  }
});

let score = 0;

let randomNumber = Math.floor(Math.random() * words.length);
randomtext.textContent = words[randomNumber];

input.addEventListener("input", () => {

  if (input.value.toLowerCase() === randomtext.textContent) {
    input.value = "";

    randomNumber = Math.floor(Math.random() * words.length);
    randomtext.textContent = words[randomNumber];
    input.classList.remove("error");
    input.setAttribute("placeholder", "So'zni yozing...");
    score++;
    result.textContent = score;
    time += count;

  } else if (words[randomNumber].length === input.value.length) {
    input.classList.add("error");
    input.setAttribute("placeholder", "Noto'g'ri so'z...");
    input.value = "";
  }
});

// decretime

const decretime = () => {
  const timeInterval = setInterval(function () {
    time--;
    if (time > 59) {
      timeEl[0].textContent = Math.floor(time / 60).toString().padStart(2, "0");
      timeEl[1].textContent = (time % 60).toString().padStart(2, "0");
    } else {
      timeEl[0].textContent = "00";
      timeEl[1].textContent = time.toString().padStart(2, "0");
    }

    if (time === 0) {
      overlayEl.style.display = "flex";
      modalScore.textContent = score;
      // save this max score to localStorage
      if (score > localStorage.getItem("record")) {
        localStorage.setItem("record", score);
      }
      recordScore.textContent = localStorage.getItem("record");
      clearInterval(timeInterval);
    }
  }, 1000);
}

decretime()


// restart game;

modalBtn.addEventListener("click", () => {
  time = 5;
  score = 0;
  result.textContent = 0;
  timeEl[1].textContent = time.toString().padStart(2, "0");
  randomNumber = Math.floor(Math.random() * words.length);
  randomtext.textContent = words[randomNumber];
  decretime()
  overlayEl.style.display = "none";
  input.value = "";
})