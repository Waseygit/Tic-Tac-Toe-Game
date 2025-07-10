document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  const restartButton = document.getElementById('restartButton');

  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let isGameActive = true;

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

  function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.getAttribute('data-cell-index');

    if (gameBoard[cellIndex] !== '' || !isGameActive) return;

    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    const winningCombo = getWinningCombo();
    if (winningCombo) {
      highlightWinningCells(winningCombo);
      isGameActive = false;
      setTimeout(() => {
        restartGame();
      }, 3000);
      return;
    }

    if (gameBoard.every(cell => cell !== '')) {
      alert("It's a draw!");
      isGameActive = false;
      setTimeout(() => {
        restartGame();
      }, 3000);
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  function getWinningCombo() {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return condition;
      }
    }
    return null;
  }

  function highlightWinningCells(combo) {
    combo.forEach(index => {
      cells[index].classList.add('strike');
    });
  }

  function restartGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('strike');
    });
  }

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  restartButton.addEventListener('click', restartGame);
});
