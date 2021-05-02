var gameBoard;
var squares = ["", "", "", "", "", "", "", "", ""];
var player = 'X';


const box = document.querySelectorAll('.box');
startGame();
checkWin();


function clickTurn(id) {
  squares[id] = player;
  document.getElementById(0 + id).innerHTML = player;
  if (player === 'X') {
    player = 'O';
  } else {
    player = 'X';
  }
}

function startGame() {
  gameBoard = Array.from(Array(9).keys());
  for (var i = 0; i < box.length; i++) {
    box[i].innerHTML = '';
    player = 'X';
  }
}

function checkWin(squares) {
  const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [0, 4, 8],
  [6, 4, 2],
  [1, 4, 7],
  [2, 5, 8],
];
  for (let i = 0; i < win.length; i++) {
    const [a, b, c] = win[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null;
}