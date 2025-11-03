import PlayerWindow from "./PlayerWindow";
import { useState } from "react";
function GameBoard({ players, setPlayers }) {
  //   const [players, setPlayers] = useState([
  //     { name: "Avital", steps: 0, status: true },
  //     { name: "Moriel", steps: 0, status: false },
  //   ]);
  const [pointer, setPointer] = useState(0);

  //   function addPlayer(player) {
  //     setPlayers((prev) => [...prev, player]);
  //   }

  function handleTurnMovement(next) {
    let newPlayers = players.map((player) => ({ ...player, status: false }));
    newPlayers[next].status = true;
    setPlayers(newPlayers);
  }

  function movePlayer() {
    const next = pointer === players.length - 1 ? 0 : pointer + 1;
    setPointer(next);
    handleTurnMovement(next);
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
            movePlayer={movePlayer}
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
