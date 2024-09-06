const gameData = [
  //2D array
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let editedPlayer = 0;//tracks which player it is
let activePlayer = 0;//which player
let currentRound = 1;//notes the no of clicks
let gameIsOver = false;

const players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

const playerConfigOverlayElement = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form"); //selects the whole form
const errorsOutputElement = document.getElementById("config-error");
const gameAreaElement = document.getElementById("active-games");

//declaring constants here and using it in the other js files yes it is valid as it will only be used if the addeventlisterner
//are called and before execuation of addeventlisteners all the above code will be execuated as we are declaring it at the last
const editPlayer1Element = document.getElementById("edit-player-1-btn");
const editPlayer2Element = document.getElementById("edit-player-2-btn");
const cancleConfigBtnElement = document.getElementById("cancle-config");
const startNewGameBtnElement = document.getElementById("start-game-btn");

//const gameFieldElements =  document.querySelectorAll('#game-board li');
// will select all the list items // both will do the same work
const gameBoardElement = document.getElementById("game-board");
const activePlayerNameElement = document.getElementById("active-player-name");
const gameOverElement = document.getElementById("game-over");
const h2Element = document.getElementById("h2");

// before execuation of add event listerners all the above code will be execuated
editPlayer1Element.addEventListener("click", openPlayerConfig);
// js allows us to define function in one file and call it in another file --> the only matter is the order
//in our case fuction defined in config.js and called it in app.js
//so config.js file should be linked previous to app.js
editPlayer2Element.addEventListener("click", openPlayerConfig);

cancleConfigBtnElement.addEventListener("click", closePlayerConfig);

// we can add addeventlisteners to any not necessary that it should only be added to buttons or links only!!
// in our case if i click anywhere on the back drop the following function will be execuated
backdropElement.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);
// above statement points to the form and the button type submit refer html file --> we dont want to submit the data so to prevent that
//we call the following function in config.js

startNewGameBtnElement.addEventListener("click", startNewGame);

//  for(const gameFieldElement of gameFieldElements){//here we are adding addeventlistener to every list item
//   gameFieldElement.addEventListener('click',selectGameField);
//  }
gameBoardElement.addEventListener("click", selectGameField);
//for above addeventlistner if we click on a gap the whole box will be replaced with x
// as we are clicking on the whole field
