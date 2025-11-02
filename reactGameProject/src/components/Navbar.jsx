import React, { useState } from "react";

// const scoresMemory = {
//   Avital: [12, 10, 5],
//   Moriel: [5, 18, 3],
//   Avi: [],
//   coco: [4, 19, 20],
//   lily: [20, 2],
// };

// const top3LowestAverages = Object.entries(scoresMemory)
//   .map(([name, scores]) => {
//     if (scores.length === 0) return { name, avg: null }; // skip empty
//     const avg = scores.reduce((sum, n) => sum + n, 0) / scores.length;
//     return { name, avg };
//   })
//   // filter out null and zero averages
//   .filter(({ avg }) => avg && avg !== 0)
//   // sort by ascending average (lowest first)
//   .sort((a, b) => a.avg - b.avg)
//   // take top 3
//   .slice(0, 3);

// console.log(top3LowestAverages);

// 1️⃣ Get the data back from localStorage
const saved = localStorage.getItem("scoresMemory");

if (saved) {
  // 2️⃣ Convert string back to object
  const scoresMemory = JSON.parse(saved);

  // 3️⃣ Calculate top 3 lowest averages (ignoring empty & zero)
  const top3LowestAverages = Object.entries(scoresMemory)
    .map(([name, scores]) => {
      if (!scores || scores.length === 0) return { name, avg: null };
      const avg = scores.reduce((sum, n) => sum + n, 0) / scores.length;
      return { name, avg };
    })
    .filter(({ avg }) => avg && avg !== 0)
    .sort((a, b) => a.avg - b.avg)
    .slice(0, 3);

  console.log(top3LowestAverages);
} else {
  console.log("No data found in localStorage under 'scoresMemory'");
}

function NavBar() {
  const [addPlayer, setAddPlayer] = useState(false);
  const [showBoard, setShowBoard] = useState(false);

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

  function getTop3() {
    const allPlayersStr = localStorage.getItem("scoresMemory");
    if (saved) {
      const allPlayers = JSON.parse(allPlayersStr);

      const top3 = Object.entries(allPlayers)
        .map(([name, scores]) => {
          if (!scores || scores.length === 0) return { name, avg: null };
          const avg = Math.round(
            scores.reduce((sum, n) => sum + n, 0) / scores.length
          );
          return { name, avg };
        })
        .filter(({ avg }) => avg && avg !== 0)
        .sort((a, b) => a.avg - b.avg)
        .slice(0, 3);
      return top3;
    }
  }

  function displayShowBoard() {
    const top3Players = getTop3();
    return (
      <div id="showBoardContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{top3Players[0]["name"]}</td>
              <td>{top3Players[0]["avg"]}</td>
            </tr>
            <tr>
              <td>{top3Players[1]["name"]}</td>
              <td>{top3Players[1]["avg"]}</td>
            </tr>
            <tr>
              <td>{top3Players[2]["name"]}</td>
              <td>{top3Players[2]["avg"]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <div id="navBarContainer">
        <button onClick={() => setAddPlayer(!addPlayer)}>Add Player</button>

        {addPlayer && displayAddPlayer()}

        <button onClick={() => setShowBoard(!showBoard)}>
          Show Score Board
        </button>

        {showBoard && displayShowBoard()}
      </div>
    </>
  );
}

export default NavBar;
