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
    const currentIndex = players.findIndex(
      (player) => player.name === currentPlayer.name
    );
    const remainingPlayers = players.filter(
      (player) => player.name !== currentPlayer.name
    );
    const newPlayers = [
      ...remainingPlayers,
      { ...currentPlayer, status: false },
    ];

    const nextPointer =
      currentIndex >= remainingPlayers.length ? 0 : currentIndex;

    setPlayers(newPlayers);
    setPointer(nextPointer);
    handleTurnMovement(nextPointer);
  }

  function handleExit(currentPlayer) {
    const currentIndex = players.findIndex(
      (player) => player.name === currentPlayer.name
    );
    const remainingPlayers = players.filter(
      (player) => player.name !== currentPlayer.name
    );
    if (remainingPlayers.length === 0) {
      setPlayers([]);
      return;
    }
    const nextPointer =
      currentIndex >= remainingPlayers.length ? 0 : currentIndex;

    const newPlayers = remainingPlayers.map((player, i) => ({
      ...player,
      status: i === nextPointer,
    }));

    setPlayers(newPlayers);
    setPointer(nextPointer);
  }

  return (
    <>
      <div id="playersGrid">
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
      </div>
    </>
  );
}

export default GameBoard;
