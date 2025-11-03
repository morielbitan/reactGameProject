function WinningDisplay({
  currentPlayer,
  handleExit,
  handleNewGame,
  steps,
  movePointer,
}) {
  function addStepsToMemory() {
    const allPlayers = JSON.parse(localStorage.getItem("scoresMemory"));
    allPlayers[currentPlayer["name"]].push(steps);
    console.log(allPlayers);
    localStorage.setItem("scoresMemory", JSON.stringify(allPlayers));
  }
  return (
    <>
      <div className="winning-display">
        <h1>You WON!</h1>
        {addStepsToMemory()}
        <button
          className="control-btn"
          onClick={() => {
            handleNewGame(currentPlayer);
            movePointer();
          }}
        >
          New Game
        </button>
        <button
          className="control-btn"
          onClick={() => {
            handleExit(currentPlayer);
            movePointer();
          }}
        >
          Quit
        </button>
      </div>
    </>
  );
}
export default WinningDisplay;
