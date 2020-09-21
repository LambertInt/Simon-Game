const start = document.querySelector("#start");
const sound = document.querySelector("#sound");
const state = document.querySelector("#state");
const sliderContainer = document.querySelector("#slide-container");
const slider = document.querySelector("#slider");

const sound1 = new Audio('sounds/1.wav');
const sound2 = new Audio('sounds/2.wav');
const sound3 = new Audio('sounds/3.wav');
const sound4 = new Audio('sounds/4.wav');

let red = document.querySelector("#up-left");
let blue = document.querySelector("#up-right");
let green = document.querySelector("#down-left");
let yellow = document.querySelector("#down-right");

let arr;
let currentIndex = 0;
let currentTimeOut = 0;
let score = 0;
let playSound = false;
let soundVolume = 50;

const blinkTime = 300;

//Make the selected color (a quarter of the circle) blink for the blinkTime (in ms)
function blink(color) {
  makeSound(color);
  color.className = "circle lighten";
  setTimeout(() => {
    color.className = "circle darken";
  }, blinkTime);
}

// Turn the sound on / off
function turnSound() {
  if(playSound) {
    sound.src = "images/mute.png";
    sliderContainer.style.display = "none";
  } else if (!playSound){
    sound.src = "images/volume.png";
    sliderContainer.style.display = "block";
  }
  playSound = !playSound;
}

// The volume of the sound is choosed by the user using a sliderContainer.
function makeVolume() {
  soundVolume = slider.value;
  console.log(soundVolume);
}

// Make a different sound for each color, this is called at the start of the blink,
// The sound duration is the same as the blink duration.
function makeSound(color) {
  if (playSound) {
    let soundClone;
    switch (color) {
      case red:
        soundClone = sound1.cloneNode();
        break;
      case blue:
        soundClone = sound2.cloneNode();
        break;
      case green:
        soundClone = sound3.cloneNode();
        break;
      case yellow:
        soundClone = sound4.cloneNode();
        break;

      default:
        break;
    }
    soundClone.volume = soundVolume / 100 ;
    soundClone.play();
  }
}

//Input the max and it returns a random integer number between 0 and the max.
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// The game reads the array containing the random generated numbers between 0 and 3
// And it makes the color blink (0 for red, 1 for blue, 2 for green, 3 for yellow).
// The state of the game to "Memorize" at the start and to "Repeat the pattern" at the end.
function readArray(arr) {
  state.innerHTML = "Memorize";
  currentTimeOut = 0;
  arr.forEach((key) => {
    switch (key) {
      case 0:
        setTimeout(() => {
          blink(red);
        }, currentTimeOut);
        break;
      case 1:
        setTimeout(() => {
          blink(blue);
        }, currentTimeOut);
        break;
      case 2:
        setTimeout(() => {
          blink(green);
        }, currentTimeOut);
        break;
      case 3:
        setTimeout(() => {
          blink(yellow);
        }, currentTimeOut);
        break;

      default:
        break;
    }
    currentTimeOut += 350;
  });

  setTimeout(() => {
    state.innerHTML = "Repeat the pattern";
  }, currentTimeOut);
}

// Call when the start button is pressed, it begins the game by creating an array and initializing
// the score, then put a random number in arr and then call the readArray function, then it offers
// the possibility for the player to click by calling addEvents.
function startGame() {
  start.style.display = "none";

  arr = [];
  score = 0;

  arr.push(getRandomInt(4));
  readArray(arr);

  setTimeout(() => {
    addEvents();
  }, currentTimeOut);
}

// Add a random number in arr and read the sequence and iterate the score.
// Then the player can try to redo the sequence properly.
function makeTurn() {
  score++;

  arr.push(getRandomInt(4));
  readArray(arr);

  setTimeout(() => {
    addEvents();
  }, currentTimeOut);
}

// This function is added as click event on the quarter of the circle. For each,
// a different number is assign (0 for red, 1 for blue, 2 for green, 3 for yellow).
// It analyzes what is the input of the player and either let him continue if he's correct
// or end the game if he's wrong. 
function checkInput(clicked) {
  removeEvents();
  if (clicked != arr[currentIndex]) {
    endGame();
  } else {
    if (currentIndex === arr.length - 1) {
      currentIndex = 0;
      state.innerHTML = "Great !";
      setTimeout(() => {
        makeTurn();
      }, 700);
    } else {
      // The player is correct and can play again after the blink effect.
      currentIndex++;
      setTimeout(() => {
        addEvents();
      }, blinkTime);
    }
  }
}

// Called when the player lose
function endGame() {
  start.style.display = "block";
  state.innerHTML = "You Lost ! 😓 | Score : " + score;
  start.innerText = "Try again ?";
  currentIndex = 0;
  currentTimeOut = 0;
}

// Add the events of checkInput and blink on each quarter of the circle so that the player can play.
function addEvents() {
  red.addEventListener("click", () => checkInput(0));
  blue.addEventListener("click", () => checkInput(1));
  green.addEventListener("click", () => checkInput(2));
  yellow.addEventListener("click", () => checkInput(3));

  red.addEventListener("click", () => blink(red));
  blue.addEventListener("click", () => blink(blue));
  green.addEventListener("click", () => blink(green));
  yellow.addEventListener("click", () => blink(yellow));
}

// Remove the event when the sequence is read so that the player doesn't destroy the game.
function removeEvents() {
  let newRed = red.cloneNode(true);
  red.parentNode.replaceChild(newRed, red);
  red = newRed;

  let newBlue = blue.cloneNode(true);
  blue.parentNode.replaceChild(newBlue, blue);
  blue = newBlue;

  let newGreen = green.cloneNode(true);
  green.parentNode.replaceChild(newGreen, green);
  green = newGreen;

  let newYellow = yellow.cloneNode(true);
  yellow.parentNode.replaceChild(newYellow, yellow);
  yellow = newYellow;
}

slider.addEventListener("input", makeVolume);
sound.addEventListener("click", turnSound);
start.addEventListener("click", startGame);
