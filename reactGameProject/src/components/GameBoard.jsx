import PlayerWindow from "./PlayerWindow";
import { useState } from "react";
function GameBoard() {
  const [players, setPlayers] = useState([]);
  const [pointer, setPointer] = useState(0);
  let newPlayers = players.map((player) => (player.status = false));
  newPlayers[pointer].status = true;
  setPlayers(newPlayers);

  function movePlayer() {
    if (pointer === players.length - 1) setPointer(0);
    else setPointer((prev) => prev++);
  }

  function handleNewGame(currentPlayer) {
    setPlayers((prev) => {
      const filtered = prev.filter((p) => p.name !== currentPlayer.name);
      return [...filtered, currentPlayer];
    });
  }

  function handleExit(currentPlayer) {
    setPlayers((prev) => prev.filter((p) => p.name !== currentPlayer.name));
  }
  return (
    <>
      <div className="player-window">
        {players.map((player) => {
          <div className={player.status ? "enabled" : "disabled"}>
            <PlayerWindow
              currentPlayer={player}
              movePlayer={movePlayer}
              handleExit={handleExit}
              handleNewGame={handleNewGame}
            />
          </div>;
        })}
      </div>
    </>
  );
}

export default GameBoard;
