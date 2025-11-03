function ControlButtons({ handleStep, playerStatus }) {
  return (
    <>
      <div className="control-panel">
        <button
          className="control-btn"
          disabled={playerStatus}
          onClick={() => handleStep("+1")}
        >
          +1
        </button>
        <button
          className="control-btn"
          disabled={playerStatus}
          onClick={() => handleStep("-1")}
        >
          -1
        </button>

        <button
          className="control-btn"
          disabled={playerStatus}
          onClick={() => handleStep("*2")}
        >
          x2
        </button>

        <button
          className="control-btn"
          disabled={playerStatus}
          onClick={() => handleStep("/2")}
        >
          ÷/2
        </button>
      </div>
    </>
  );
}
export default ControlButtons;
