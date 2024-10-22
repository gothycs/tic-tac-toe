window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetBtn = document.querySelector('#reset');
    const msg = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;

    const X_WINS = 'X_WINS';
    const O_WINS = 'O_WINS';
    const DRAW = 'DRAW';

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWinner() {
        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                gameActive = false;
                if (currentPlayer === 'X') {
                    showResult(X_WINS);
                } else {
                    showResult(O_WINS);
                }
                return;
            }
        }
        if (!board.includes('')) {
            showResult(DRAW);
        }
    }

    function showResult(result) {
        if (result === X_WINS) {
            msg.innerHTML = 'Player <span class="playerX">X</span> Wins!';
        } else if (result === O_WINS) {
            msg.innerHTML = 'Player <span class="playerO">O</span> Wins!';
        } else {
            msg.innerText = 'It\'s a draw!';
        }
        msg.classList.remove('hide');
    }

    function handleMove(tile, index) {
        if (tile.innerText === '' && gameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`); 
            board[index] = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerDisplay.innerText = currentPlayer;
        }
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        msg.classList.add('hide');
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX', 'playerO');
        });
        currentPlayer = 'X';
        playerDisplay.innerText = currentPlayer;
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => handleMove(tile, index));
    });

    resetBtn.addEventListener('click', resetGame);
});
