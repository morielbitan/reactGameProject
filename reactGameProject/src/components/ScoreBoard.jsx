import React, { useState } from "react";

function ScoreBoard() {
  const [showBoard, setShowBoard] = useState(false);

  function getTop3() {
    const allPlayersStr = localStorage.getItem("scoresMemory");
    if (allPlayersStr) {
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
      <button onClick={() => setShowBoard(!showBoard)}>Show Score Board</button>
      {showBoard && displayShowBoard()}
    </>
  );
}

export default ScoreBoard;
