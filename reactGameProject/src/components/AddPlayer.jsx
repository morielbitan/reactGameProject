import React, { useState } from "react";

function AddPlayer() {
  const [addPlayer, setAddPlayer] = useState(false);
  const [name, setName] = useState("");

  function handleAddPlayer() {
    const scoresMemory = JSON.parse(localStorage.getItem("scoresMemory")) || {};

    if (!(name in scoresMemory)) {
      scoresMemory[name] = [];
      localStorage.setItem("scoresMemory", JSON.stringify(scoresMemory));
    }
    setName("");
  }

  function displayAddPlayer() {
    return (
      <div id="addPlayerContainer">
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength="4"
          maxLength="8"
          size="10"
        />
        <button onClick={handleAddPlayer}>Add</button>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => setAddPlayer(!addPlayer)}>Add Player</button>
      {addPlayer && displayAddPlayer()}
    </>
  );
}

export default AddPlayer;
