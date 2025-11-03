import NavBar from "./components/Navbar";
import "./App.css";
import { useState } from "react";
import GameBoard from "./components/GameBoard";
function App() {
  const [players, setPlayers] = useState([]);

  function addPlayer(player) {
    setPlayers((prev) => [...prev, player]);
  }

  return (
    <>
      <NavBar addPlayer={addPlayer} />
      <GameBoard players={players} setPlayers={setPlayers} />
    </>
  );
}

export default App;
