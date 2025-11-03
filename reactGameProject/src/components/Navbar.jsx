import ScoreBoard from "./ScoreBoard";
import AddPlayer from "./AddPlayer";

function NavBar({ addPlayer }) {
  return (
    <>
      <div id="navBarContainer">
        <AddPlayer addPlayer={addPlayer} />
        <ScoreBoard />
      </div>
    </>
  );
}

export default NavBar;
