let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameStarted = false;

function placeMark(index) {
  if (!gameStarted) {
    gameStarted = true;
    document.getElementById("restart-button").classList.remove("hidden");
  }

  if (gameBoard[index] === "" && !checkWinner()) {
    gameBoard[index] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
      let message = `Player ${currentPlayer} wins!`;
      showMessage(message);
      document.getElementById("restart-button").classList.remove("hidden");
    } else if (!gameBoard.includes("")) {
      let message = "It's a draw!";
      showMessage(message);
      document.getElementById("restart-button").classList.remove("hidden");
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      document.getElementById("turn-message").innerText = `Player ${currentPlayer}'s turn`;
    }
  }
}

function resetBoard() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  renderBoard();
  document.getElementById("turn-message").innerText = "Player X's turn";
  hideMessage();
  document.getElementById("restart-button").classList.add("hidden");
  gameStarted = false;
}

function renderBoard() {
  gameBoard.forEach((mark, index) => {
    document.getElementsByClassName("cell")[index].innerText = mark;
  });
}

function showMessage(message) {
  document.getElementById("modal-message").innerText = message;
  document.getElementById("modal").classList.remove("hidden");
}

function hideMessage() {
  document.getElementById("modal").classList.add("hidden");
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];

  for (let combo of winningCombos) {
    if (gameBoard[combo[0]] === currentPlayer &&
        gameBoard[combo[1]] === currentPlayer &&
        gameBoard[combo[2]] === currentPlayer) {
      return true;
    }
  }
  return false;
}

// Zde zobrazíme tlačítko restartu po načtení stránky
document.getElementById("restart-button").classList.add("hidden");