function WinningDisplay({ currentPlayer, handleExit, handleNewGame }) {
  return (
    <>
      <div className="winning-display">
        <h1>You WON!</h1>{" "}
        <button
          className="control-btn"
          onClick={() => handleNewGame(currentPlayer)}
        >
          New Game
        </button>
        <button
          className="control-btn"
          onClick={() => handleExit(currentPlayer)}
        >
          Quit
        </button>
      </div>
    </>
  );
}
export default WinningDisplay;
