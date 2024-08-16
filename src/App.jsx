import { useState } from "react";
import "./App.css";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combination";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player == "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function deriveWinner(gameBoard, players) {
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
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;
  const handleSelectPlayer = (rowIndex, colIndex) => {
    // setActivePlayer((curActivePlayer) => (curActivePlayer == "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updateTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer, // The player making the move
        },
        ...prevTurns,
      ];
      return updateTurns;
    });
  };
  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symol]: newName,
      };
    });
  }
  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className={"highlight-player"}>
            <Player
              initialName="player 1" // Initial name of Player 1
              symbol={"X"}
              isActive={activePlayer === "X"} // Determine if Player 1 is the active player
              onChangeName={handlePlayerNameChange}
            />
            <Player
              initialName="player 2" // Initial name of Player 2
              symbol="O"
              isActive={activePlayer === "O"}
              onChangeName={handlePlayerNameChange}
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver winner={winner} onRestart={handleRestart} />
          )}
          {/* Render the game board component */}
          <GameBoard onSelectPlayer={handleSelectPlayer} board={gameBoard} />
        </div>
        {/* Render the log component */}
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
