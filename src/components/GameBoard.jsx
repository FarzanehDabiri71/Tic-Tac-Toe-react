export default function GameBoard({
  onSelectPlayer,
  // activePlayerSymbol,
  board,
}) {
  return (
    <>
      <ol id="game-board">
        {board.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button
                    disabled={playerSymbol !== null}
                    onClick={() => onSelectPlayer(rowIndex, colIndex)}
                  >
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}

// const [gameBoard, setGameBoard] = useState(initialGameBoard);
// // Function to handle the selection of a square on the board
// const handleSelectSquare = (rowIndex, colIndex) => {
//   // Update the game board state
//   setGameBoard((prevGameBoard) => {
//     // Create a deep copy of the current game board state
//     const updatedBoard = [
//       ...prevGameBoard.map((innerArray) => [...innerArray]),
//     ];
//     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
//     return updatedBoard;
//   });
//   // Call onSelectPlayer to switch the active player
//   onSelectPlayer();
// };
