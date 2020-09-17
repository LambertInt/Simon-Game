const start = document.querySelector("#start");

const state = document.querySelector("#state");

let red = document.querySelector("#up-left");
let blue = document.querySelector("#up-right");
let green = document.querySelector("#down-left");
let yellow = document.querySelector("#down-right");

let arr;
let currentIndex = 0;
let currentTimeOut = 0;

const blinkTime = 300;  

//To avoid some color bug when the user is spamming
function resetColor() {
  red.className = "circle darken";
  blue.className = "circle darken";
  green.className = "circle darken";
  yellow.className = "circle darken";
}

//Make the selected color (a quarter of the circle) blink for the blinkTime (in ms)
function blink(color) {
  color.className = "circle lighten";
  setTimeout(() => {
    color.className = "circle darken";
  }, blinkTime);
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

// Call when the start button is pressed, it begins the game by putting
// a random number in arr and then call the readArray function, then it offers
// the possibility for the player to click by calling addEvents.
function startGame(){
  start.style.display = "none";

  arr = new Array();

  arr.push(getRandomInt(4));
  readArray(arr);

  setTimeout(() => {
    addEvents();
  }, currentTimeOut);
}

// Add a random number in arr and read the sequence. Then the player can try to 
// redo the sequence properly.
function makeTurn(){
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
function checkInput(clicked){
  if(clicked != arr[currentIndex]) {
    endGame();
  } else{
    if(currentIndex === arr.length-1) {
      currentIndex = 0;
      state.innerHTML = "Great !";
      removeEvents();
      setTimeout(() => {
        makeTurn();
      }, 700);
    } else {
      currentIndex ++;
    }
  }
}

// Called when the player lose
function endGame(){
  start.style.display = "block";
  start.innerText = "Try again ?";
  state.innerHTML = "You Lost ! 😟";
  currentIndex = 0;
  currentTimeOut = 0;
  removeEvents();
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


start.addEventListener("click",startGame);
