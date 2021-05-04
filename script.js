var gameActive = true;
let currentPlayer = "X";
let scoreX = 0;
let scoreY = 0;
var gameState = ["", "", "", "", "", "", "", "", ""]; //This holds the values from clicks on board

//These will be the win, draw, and player turn messages at bottom
const statusDisplay = document.querySelector('.game--status');
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `It's a Draw Jim!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

const gameScore = document.querySelector('.game--scoresheet');
const xPlayer = () => `Player X ${scoreX}`;

const gameScore1 = document.querySelector('.game--scoresheet1');
const yPlayer = () => `Player O ${scoreY}`;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

statusDisplay.innerHTML = currentPlayerTurn();

function boxPlayed(clickedBox, clickedBoxIndex) {
  gameState[clickedBoxIndex] = currentPlayer;
  clickedBox.innerHTML = currentPlayer;
}
function PlayerChange() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";//using a ternary operator for player changing(fancy if-statement) if player = x change to o if not x change to x
  statusDisplay.innerHTML = currentPlayerTurn();
}
//want to use an array to store win conditions and somehow go through the array(for-loop)and match result of board clicks to same array
function ResultValidation() {
  let roundWon = false;
  for (var i = 0; i <= 7; i++) { //for-loop to go through array values took me sooo long to figure out that using 7 was better than using .length operator
    const winCondition = winningConditions[i]; //calling array winningConditions, assigning to winCondition variable so i can use in a, b, c variable
    let a = gameState[winCondition[0]]; //assigning each variable to an array location 0 = first location in each array, 1 = second, etc.
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') { //if a is blank or b blank or c blank then continue
      continue;
    }
    if (a === b && b ===c) { //if there is a match between array 0 and 1 And between 1 and 2 then round win is true, break loop
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();//makes winning message and disables board
    if (currentPlayer == "X") { //assigns win to current player
      scoreX++;
    } else if (currentPlayer == "O") {
      scoreY++;
    }
    gameScore.innerHTML = xPlayer();
    gameScore1.innerHTML = yPlayer();
    gameActive = false;
    return;
  }
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  PlayerChange(); //calling function to change player turns, took me awhile to figure out why player turns were not occuring 
}

//two things needed track click event, and 
function BoxClick(clickedBoxEvent) {
  const clickedBox = clickedBoxEvent.target;//track click event
  const clickedBoxIndex = parseInt( //since click events are saved as strings, have to turn the index back into a number to use in array
    clickedBox.getAttribute('data-cell-index')
  );
  if (gameState[clickedBoxIndex] !== "" || !gameActive) { //checking if box has been clicked before, if not return; if assigned value gameActive = false box not clickable
    return;
  } 
  boxPlayed(clickedBox, clickedBoxIndex);
  ResultValidation();
}

function RestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.box')
  .forEach(box => box.innerHTML = "");
}

document.querySelectorAll('.box').forEach(box => box.addEventListener('click', BoxClick));
document.querySelector('.game--restart').addEventListener('click', RestartGame);
