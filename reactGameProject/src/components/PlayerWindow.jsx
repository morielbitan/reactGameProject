import { useState } from "react";
import ControlButtons from "./ControlButtons";
import WinningDisplay from "./WinningDisplay";

function PlayerWindow({
  currentPlayer,
  movePointer,
  handleExit,
  handleNewGame,
  playerStatus,
}) {
  const [steps, setSteps] = useState(0);
  const [number, setNumber] = useState(Math.floor(Math.random() * 10));

  function handleStep(move) {
    setNumber((prev) => {
      const operator = move[0];
      const value = Number(move.slice(1));
      const operations = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
      };
      const action = operations[operator];
      if (!action || isNaN(value)) return prev;
      return Math.floor(action(prev, value));
    });
    setSteps((prev) => prev + 1);
    movePointer();
  }
  function resetGame() {
    setSteps(0);
    setNumber(Math.floor(Math.random() * 10));
  }
  function playerPastGames() {
    const allPlayers = JSON.parse(localStorage.getItem("scoresMemory"));
    return allPlayers[currentPlayer.name];
  }
  return (
    <>
      <h2 className="user-name">{currentPlayer.name}</h2>
      <h2 className="past-games">
        Past Games Scores: {playerPastGames().join(", ")}
      </h2>
      <h2 className="steps">Steps: {steps}</h2>
      <h2 className="status">{playerStatus ? "enabled" : "disabled"}</h2>
      <h1 className="number">{number}</h1>

      {number === 10 ? (
        <WinningDisplay
          currentPlayer={currentPlayer}
          handleNewGame={(player) => {
            handleNewGame(player);
            resetGame();
          }}
          handleExit={handleExit}
          steps={steps}
        />
      ) : (
        <ControlButtons handleStep={handleStep} playerStatus={playerStatus} />
      )}
    </>
  );
}

export default PlayerWindow;
