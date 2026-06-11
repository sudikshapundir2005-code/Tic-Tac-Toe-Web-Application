const cells = document.querySelectorAll("[data-cell]");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
let currentPlayer = "X";
let gameActive = true;
const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
];
function handleCellClick(e) 
{
        const cell = e.target;
        if (cell.textContent !== "" || !gameActive) 
                {
                        return;
                }
        cell.textContent = currentPlayer;
        if (checkWinner()) 
                {
                        statusText.textContent = `Player ${currentPlayer} Wins!`;
                        gameActive = false;
                        return;
                }
        if (isDraw()) 
                {
                        statusText.textContent = "Game Draw!";
                        gameActive = false;
                        return;
                }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
}
function checkWinner() 
{
        return winningCombinations.some(combination => 
                {
                        return combination.every(index => 
                                {
                                                return cells[index].textContent === currentPlayer;
                                });
                });
}
function isDraw() 
{
        return [...cells].every(cell => cell.textContent !== "");
}
function restartGame() 
{
        cells.forEach(cell => 
                {
                        cell.textContent = "";
                });
        currentPlayer = "X";
        gameActive = true;
        statusText.textContent = "Player X's Turn";
}
cells.forEach(cell => 
        {
                cell.addEventListener("click", handleCellClick);
        });
restartBtn.addEventListener("click", restartGame);