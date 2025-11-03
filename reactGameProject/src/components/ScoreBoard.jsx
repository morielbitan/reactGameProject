import React, { useState } from "react";

function ScoreBoard() {
  const [showBoard, setShowBoard] = useState(false);
  function getTop3() {
    const allPlayersStr = localStorage.getItem("scoresMemory");
    if (!allPlayersStr) return [];

    const allPlayers = JSON.parse(allPlayersStr);

    let top3 = Object.entries(allPlayers)
      .map(([name, scores]) => {
        if (!scores || scores.length === 0) return { name, avg: null };
        const avg = Math.round(
          scores.reduce((sum, n) => sum + n, 0) / scores.length
        );
        return { name, avg };
      })
      .sort((a, b) => {
        if (a.avg === null) return 1;
        if (b.avg === null) return -1;
        return a.avg - b.avg;
      })
      .slice(0, 3)
      .map((player) => ({
        name: player.avg === null ? "-" : player.name,
        avg: player.avg === null ? "-" : player.avg,
      }));
    while (top3.length < 3) {
      top3.push({ name: "-", avg: "-" });
    }

    return top3;
  }

  function displayShowBoard() {
    const top3Players = getTop3();
    return (
      <div id="showBoardContainer">
        <table>
          <caption>Top 3 Players (lowest average at the top!)</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Average</th>
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
