
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    let currentPlayer = "X";
    let gameActive = true;
    let cells = Array(9).fill("");

    // Create cells
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      cell.addEventListener("click", handleClick);
      board.appendChild(cell);
    }

    function handleClick(e) {
      const index = e.target.dataset.index;
      if (cells[index] !== "" || !gameActive) return;

      cells[index] = currentPlayer;
      e.target.textContent = currentPlayer;
      e.target.classList.add("taken");

      if (checkWin()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
      }

      if (cells.every(cell => cell !== "")) {
        status.textContent = "It's a draw!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWin() {
      const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // cols
        [0,4,8],[2,4,6]          // diagonals
      ];
      return winPatterns.some(pattern =>
        pattern.every(index => cells[index] === currentPlayer)
      );
    }

    function resetGame() {
      cells.fill("");
      document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
      });
      currentPlayer = "X";
      gameActive = true;
      status.textContent = "Player X's turn";
    }
