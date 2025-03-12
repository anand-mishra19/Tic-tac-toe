const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');
let isXTurn = true;
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

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

const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = cell.getAttribute('data-index');

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = isXTurn ? 'X' : 'O';
    cell.textContent = board[cellIndex];
    cell.classList.add(isXTurn ? 'x' : 'o');

    if (checkWin()) {
        gameStatus.textContent = `Player ${isXTurn ? 'X' : 'O'} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        gameStatus.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    isXTurn = !isXTurn;
    gameStatus.textContent = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
};

const checkWin = () => {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
};

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isXTurn = true;
    gameActive = true;
    gameStatus.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
