import { useState } from "react"; // Importing the useState hook from React for managing state in the component
import reactLogo from "./assets/react.svg"; // Importing a React logo image from the specified path
import viteLogo from "/vite.svg"; // Importing a Vite logo image from the specified path
import "./App.css"; // Importing CSS styles for the component
import Player from "./components/Player"; // Importing the Player component
import GameBoard from "./components/GameBoard"; // Importing the GameBoard component
import Log from "./components/Log"; // Importing the Log component
import { WINNING_COMBINATIONS } from "./components/winning-combination";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X"; // Default player is "X"

  // Check if the last move was made by "X" to switch to "O"
  if (gameTurns.length > 0 && gameTurns[0].player == "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

// Main App component
function App() {
  // Declare state variables
  const [gameTurns, setGameTurns] = useState([]); // State to track the history of game turns, initialized as an empty array
  // const [activePlayer, setActivePlayer] = useState("X"); // State to track the current active player, initialized to "X"
  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  // Function to toggle the active player and update game turns
  const handleSelectPlayer = (rowIndex, colIndex) => {
    // Toggle the active player between "X" and "O"
    // setActivePlayer((curActivePlayer) => (curActivePlayer == "X" ? "O" : "X"));

    // Update the game turns history
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      // currentPlayer = activePlayer;
      // Create a new turn entry with the current player's move
      const updateTurns = [
        {
          square: { row: rowIndex, col: colIndex }, // The row and column of the selected square
          player: currentPlayer, // The player making the move
        },
        ...prevTurns, // Spread the existing turns into the new list
      ];
      return updateTurns; // Return the updated list of turns
    });
  };

  // Render the component
  return (
    <>
      <main>
        <div id="game-container">
          {/* Render players with highlighting for the active player */}
          <ol id="players" className={"highlight-player"}>
            <Player
              initialName="player 1" // Initial name of Player 1
              symbol={"X"} // Symbol representing Player 1
              isActive={activePlayer === "X"} // Determine if Player 1 is the active player
            />
            <Player
              initialName="player 2" // Initial name of Player 2
              symbol="O" // Symbol representing Player 2
              isActive={activePlayer === "O"} // Determine if Player 2 is the active player
            />
          </ol>
          {winner && <GameOver winner={winner} />}
          {/* Render the game board component */}
          <GameBoard
            onSelectPlayer={handleSelectPlayer} // Pass the function to handle player selection
            // activePlayerSymbol={activePlayer} // Pass the active player's symbol
            board={gameBoard}
          />
        </div>
        {/* Render the log component */}
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App; // Export the App component as the default export
