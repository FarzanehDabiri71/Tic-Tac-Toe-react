import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
  // State variable to store the player's name, initialized with initialName prop
  const [playerName, setPlayerName] = useState(initialName);

  // State variable to track whether the name is being edited
  const [isEditing, setIsEditing] = useState(false);

  // Handler function to toggle the editing mode
  const handleEditClick = () => {
    // Toggle the isEditing state between true and false
    setIsEditing((isEditing) => !isEditing); //true
    // setIsEditing((isEditing) => !isEditing); // false

    // setIsEditing((!isEditing); //true
    // setIsEditing( !isEditing); // true
  };

  // Handler function to update the playerName state when the input value changes
  const handleChangeName = (e) => {
    setPlayerName(e.target.value);
    console.log(playerName);
    console.log(e.target.value);
  };
  // Conditionally set the editablePlayerName to either a span or an input field based on isEditing state
  let editablePlayerName = <span className="player-name"> {playerName}</span>;
  let btnCaption = "Edit";

  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleChangeName}
      />
    );

    btnCaption = "Save";
  }
  console.log(isActive, symbol);

  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {/* player name */}
          {editablePlayerName}
          {/* player symbol */}
          <span className="player-symbol">{symbol}</span>
          {/* Button to toggle edit mode */}
        </span>
        {/* update player name  */}
        <button onClick={handleEditClick}>{btnCaption}</button>
        {/* <button onClick={handleEditClick}>{isEditing ? 'Save': 'Edit'}</button> */}
      </li>
    </>
  );
}
