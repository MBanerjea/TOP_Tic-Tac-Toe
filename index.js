// const createBoard = (function () {
//   const squares = document.querySelectorAll('.squares');
//   console.log(squares.length);

//   for (let i = 0; i < squares.length; i++) {
//     squares[i].dataset.index = i;
//     squares[i].addEventListener('click', () =>
//       console.log(squares[i].dataset.index));
//   }

//   return { squares };
// })();

// console.log(squares);

// function createPlayer(name) {
//   const playerName = name;

//   let wins = 0;
//   const getwins = () => wins;
//   const givewins = () => wins++;

//   return { playerName, getwins, givewins };
// }

// function gameControl() {

// }
const displayController = (() => {
  const renderMessage = (message) => {
    document.querySelector('#message').innerText = message;
  }
  return { renderMessage }
})();


const board = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHTML = "";
    gameBoard.forEach((square, index) => {
      boardHTML += `<div class="square" id=square-${index}>${square}</div>`;
    })
    document.querySelector('#box').innerHTML = boardHTML;

    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener('click', gameControl.handleClick);
    })

  }
  const getGameBoard = () => gameBoard;

  const update = (index, value) => {
    gameBoard[index] = value;
    render();
  }

  return { render, update, getGameBoard };
})();

const createPlayer = (name, mark) => {
  return { name, mark };
}

const gameControl = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector('#player1').value, "X"),
      createPlayer(document.querySelector('#player2').value, "O")
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    selectorAndButtons.startButton.disabled = true;
    board.render();
  }

  const handleClick = (event) => {
    if (gameOver) {
      return;
    }
    let index = parseInt(event.target.id.slice(-1));

    if (board.getGameBoard()[index] !== "")
      return;
    board.update(index, players[currentPlayerIndex].mark);

    if (checkForWin(board.getGameBoard(), players[currentPlayerIndex].mark)) {
      gameOver = true;
      displayController.renderMessage(`${players[currentPlayerIndex].name} has won!!!`);
    } else if (checkForTie(board.getGameBoard())) {
      gameOver = true;
      displayController.renderMessage(`It's a tie!!`);
    }
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  }

  const checkForWin = (gameBoard) => {
    const winningCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < winningCombo.length; i++) {
      const [a, b, c] = winningCombo[i];
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return true;
      }

    }
    return false;
  }

  const checkForTie = (gameBoard) => {
    return gameBoard.every(cell => cell !== "")
  }

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      board.update(i, "");
    }
    board.render();
    displayController.renderMessage("");
    gameOver = true;
    selectorAndButtons.startButton.disabled = false;
  }

  const gameStatus = () => gameOver;

  return { start, handleClick, restart, gameStatus };
})();


const selectorAndButtons = (() => {
  const inputs = document.querySelectorAll('.players');

  const restartButton = document.querySelector('#restart');
  restartButton.addEventListener('click', () => {
    inputs[0].value = "";
    inputs[1].value = "";
    gameControl.restart();
  });

  const startButton = document.querySelector('#start');

  startButton.addEventListener('click', () => {
    if (inputs[0].value !== "" || inputs[1].value !== "") {
      gameControl.start();
    }
  })

  return { startButton };

})()








