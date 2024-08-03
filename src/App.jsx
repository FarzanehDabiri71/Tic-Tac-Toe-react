import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Player from "./components/Player";

function App() {
  return (
    <>
      <main>
        <div id="game-container">
          {/* players */}
          <ol id="players">
            <Player initialName="player 1" symbol={"X"} />
            <Player initialName="player 2" symbol="O" />
          </ol>
          {/* game board */}
        </div>
      </main>
    </>
  );
}

export default App;
