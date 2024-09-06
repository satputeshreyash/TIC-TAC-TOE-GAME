function resetGameStatus() {
  //setting all the values to its initial values
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;

  gameOverElement.firstElementChild.innerHTML =
    '<h2>You Won,<span id="winner-name">Player name</span>!</h2>';
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0; //settimg 2d array to 0

      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex]; //in gameboardElement all elements are stored as arry only to visualize we perform it on 2d array
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled"); //here we are removing the class
      gameBoardIndex++; //at every index we have to delete the content
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    //checking the name is valid or not
    alert("please set custom player names  for both players");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;

  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  //switching between both players one after another
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  //event.target direct accces to the text field
  //here the text content should always be written in camel case --> FUCKING IMPORTANAT
  //to validate
  console.log(event.target.tagName); //to check capital or small in our case the LI is capital
  if (event.target.tagName != "LI" || gameIsOver) {
    //gameIsOver checks for the true value gameover-->true else false
    //event.target.tagname points to the list
    return;
  }
  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  // - 1 as the indexing stands from 0 --> 0,1,2
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("select an empty field");
    return;
  }

  selectedField.textContent = players[activePlayer].symbol; //updating the textcontent inside the box
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  //1 --> for the first player and 2 --> for the second player --> see in console
  //   console.log(gameData);

  const winnerId = checkForGameOver();
  //   console.log(winnerId);

  if (winnerId != 0) {
    endGame(winnerId); //winneri is local to the scope so we have to pass it as an argument
  }

  currentRound++; //for each round we are having the track

  switchPlayer();
}

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    //checking for rows
    if (
      gameData[i][0] > 0 && //to reduce the complexity we basically perform > operation
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }
  // if(
  //     gameData[1][0] > 0 &&
  //     gameData[1][0] === gameData[1][1] &&
  //     gameData[1][1] === gameData[1][2]
  // ){
  //     return gameData[1][0];
  // }

  // if(
  //     gameData[2][0] > 0 &&
  //     gameData[2][0] === gameData[2][1] &&
  //     gameData[2][1] === gameData[2][2]
  // ){
  //     return gameData[2][0];
  // }

  for (let i = 0; i < 3; i++) {
    //checking for columns
    if (
      gameData[0][i] > 0 && //to reduce the complexity we basically perform > operation
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  if (
    //checking diagonally from left
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  if (
    //checking diagonally fromm right
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }

  return 0; //if there is no winner
}

function endGame(winnerId) {
  gameIsOver = true;

  gameOverElement.style.display = "block";

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name; //in players array it is stored in the array format 0 and 1 indexing
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName; //changing the textcontent
  } else {
    h2Element.textContent = "it's a draw";
  }
}
