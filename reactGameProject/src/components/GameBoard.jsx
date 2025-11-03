import PlayerWindow from "./PlayerWindow";
import { useState } from "react";
function GameBoard({ players, setPlayers }) {
  const [pointer, setPointer] = useState(0);

  function handleTurnMovement(newPointer) {
    let newPlayers = players.map((player) => ({ ...player, status: false }));
    newPlayers[newPointer].status = true;
    setPlayers(newPlayers);
  }

  function movePointer() {
    const newPointer = pointer === players.length - 1 ? 0 : pointer + 1;
    setPointer(newPointer);
    handleTurnMovement(newPointer);
  }

  function handleNewGame(currentPlayer) {
    const filtered = players.filter(
      (player) => player.name !== currentPlayer.name
    );
    const newPlayers = [...filtered, currentPlayer];
    setPlayers(newPlayers);
  }

  function handleExit(currentPlayer) {
    setPlayers((prev) => prev.filter((p) => p.name !== currentPlayer.name));
  }
  return (
    <>
      {players.map((player) => (
        <div
          key={player.name}
          className={`player-window ${
            player.status === true ? "enabled" : "disabled"
          }`}
        >
          <PlayerWindow
            currentPlayer={player}
            movePointer={movePointer}
            handleExit={handleExit}
            handleNewGame={handleNewGame}
            playerStatus={player.status}
          />
        </div>
      ))}
    </>
  );
}

export default GameBoard;
