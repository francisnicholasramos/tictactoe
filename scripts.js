// to fix play again logic

const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHTML = "";
    gameboard.forEach((square, index) => {
      boardHTML += `<div class='square' id="${index}">${square}</div>`;
    });
    document.querySelector(".gameboard").innerHTML = boardHTML;
    const squares = document.querySelectorAll('.square')
    squares.forEach((square) => square.addEventListener('click', Game.handleClick))
  };

  const update = (index, value) => {
    gameboard[index] = value;
    render();
  }

  const getGameboard = () => gameboard;

  return {
    render,
    update,
    getGameboard
  };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector(".player1").value, "X"),
      createPlayer(document.querySelector(".player2").value, "O"),
    ];

    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
    const squares = document.querySelectorAll('.square')
    squares.forEach((square) => square.addEventListener('click', handleClick))
  };

  const handleClick = (event) => {
    const message = document.querySelector('.message')
    const winner = document.createElement('p')
    const tie = document.createElement('p')
    let index = event.target.id;
    if (Gameboard.getGameboard()[index] !== "") return;
    Gameboard.update(index, players[currentPlayerIndex].mark)


    if (checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
      gameOver = true;
      winner.textContent = players[currentPlayerIndex].name
      message.appendChild(winner)
    } else if (checkForTie(Gameboard.getGameboard())) {
      gameOver = true;
      tie.textContent = `It's a tie!`
      message.appendChild(tie)
    }

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  }

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i, "")
      Gameboard.getGameboard()
    }
  }

  return {
    start,
    handleClick,
    restart
  };
})();

const checkForWin = (board) => {
  const winningCombinations = [
    //rows   
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //column
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal
    [2, 4, 6],
    [0, 4, 8],
  ]

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return true;
  }
  return false;
}

const checkForTie = (board) => {
  return board.every(cell => cell !== "");
}

const restartBtn = document.querySelector('.restart')
restartBtn.addEventListener("click", () => {
  Game.restart();
})

const startBtn = document.querySelector(".start");
startBtn.addEventListener("click", () => {
  let message = "Started";
  console.log(message);
  Game.start();
});

/*

win combos

row:
{0,1,2}
{3,4,5}
{6,7,8}

column:
{0,3,6}
{1,4,7}
{2,5,6}

diagonal:
{2,4,6}
{0,4,8}

*/



