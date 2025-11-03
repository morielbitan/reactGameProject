import React, { useState } from "react";

function AddPlayer({ addPlayer }) {
  const [name, setName] = useState("");

  function handleAddPlayer() {
    const scoresMemory = JSON.parse(localStorage.getItem("scoresMemory")) || {};

    if (!(name in scoresMemory)) {
      scoresMemory[name] = [];
      localStorage.setItem("scoresMemory", JSON.stringify(scoresMemory));
    }
    addPlayer({
      name: name,
      steps: [JSON.parse(localStorage.getItem("scoresMemory"))[name]],
      status: false,
    });
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
        <button disabled={!name} onClick={handleAddPlayer}>
          Add
        </button>
      </div>
    );
  }

  return <>{displayAddPlayer()}</>;
}

export default AddPlayer;
