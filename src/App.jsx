import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  // Function to toggle the active player
  const handleSelectPlayer = () => {
    setActivePlayer((curActivePlayer) => (curActivePlayer == "X" ? "O" : "X"));
  };
  return (
    <>
      <main>
        <div id="game-container">
          {/* players */}
          <ol id="players" className={"highlight-player"}>
            <Player
              initialName="player 1"
              symbol={"X"}
              isActive={activePlayer === "X"}
            />
            <Player
              initialName="player 2"
              symbol="O"
              isActive={activePlayer === "O"}
            />
          </ol>
          <GameBoard
            onSelectPlayer={handleSelectPlayer}
            activePlayerSymbol={activePlayer}
          />
        </div>
      </main>
    </>
  );
}

export default App;
