const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

const cells = document.querySelectorAll(".cell");
const statusEl = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const resetBtn = document.getElementById("reset");
const scoreEls = {
  X: document.getElementById("x-wins"),
  O: document.getElementById("o-wins"),
  draw: document.getElementById("draws")
};

let board, current, gameOver;
const scores = { X: 0, O: 0, draw: 0 };

function startRound() {
  board = Array(9).fill("");
  current = "X";
  gameOver = false;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.disabled = false;
    cell.className = "cell";
  });
  statusEl.textContent = "X's turn";
}

function findWinner() {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return line;
    }
  }
  return null;
}

function updateScores() {
  scoreEls.X.textContent = scores.X;
  scoreEls.O.textContent = scores.O;
  scoreEls.draw.textContent = scores.draw;
}

function endGame() {
  gameOver = true;
  cells.forEach(cell => (cell.disabled = true));
  updateScores();
}

function handleMove(event) {
  const index = Number(event.currentTarget.dataset.index);
  if (gameOver || board[index]) return;

  board[index] = current;
  event.currentTarget.textContent = current;
  event.currentTarget.classList.add(current.toLowerCase());
  event.currentTarget.disabled = true;

  const winLine = findWinner();
  if (winLine) {
    winLine.forEach(i => cells[i].classList.add("win"));
    statusEl.textContent = `Player ${current} wins!`;
    scores[current]++;
    endGame();
    return;
  }

  if (board.every(Boolean)) {
    statusEl.textContent = "It's a draw.";
    scores.draw++;
    endGame();
    return;
  }

  current = current === "X" ? "O" : "X";
  statusEl.textContent = `${current}'s turn`;
}

cells.forEach(cell => cell.addEventListener("click", handleMove));
restartBtn.addEventListener("click", startRound);
resetBtn.addEventListener("click", () => {
  scores.X = scores.O = scores.draw = 0;
  updateScores();
  startRound();
});

startRound();
