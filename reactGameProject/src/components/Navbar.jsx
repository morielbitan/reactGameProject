import ScoreBoard from "./ScoreBoard";
import AddPlayer from "./AddPlayer";

function NavBar() {
  return (
    <>
      <div id="navBarContainer">
        <AddPlayer />
        <ScoreBoard />
      </div>
    </>
  );
}

export default NavBar;
