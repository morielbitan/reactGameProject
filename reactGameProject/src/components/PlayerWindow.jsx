import { useState } from "react";
import ControlButtons from "./ControlButtons";
import WinningDisplay from "./WinningDisplay";
function PlayerWindow({
  currentPlayer: currentPlayer,
  movePlayer,
  handleExit,
  handleNewGame,
}) {
  const [steps, setSteps] = useState(0);
  const [number, setNumber] = useState(Math.round(Math.random() * 100));

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
      prev = action(prev, value);
    });
    setSteps((prev) => prev++);
    movePlayer();
  }

  return (
    <>
      <h2 className="user-name">{currentPlayer.name}</h2>
      <h2 className="steps">{steps}</h2>
      <h2 className="status">{currentPlayer.status}</h2>
      <h1 className="number">{number}</h1>
      number===100?
      <WinningDisplay
        currentPlayer={currentPlayer}
        handleNewGame={handleNewGame}
        handleExit={handleExit}
      />
      :<ControlButtons handleStep={handleStep} />
    </>
  );
}
export default PlayerWindow;
