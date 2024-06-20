import { useState } from "react";

export function Game() {
    const [gameLength, setGameLength] = useState(30);
    const [lastRoll, setLastRoll] = useState(null);
    const [turnTotal, setTurnTotal] = useState(0);
    const [playerOneScore, setPlayerOneScore] = useState(0);
    const [playerTwoScore, setPlayerTwoScore] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState("P1");
    const [playerOnePlaying, setPlayerOnePlaying] = useState(true);
    const [playerTwoPlaying, setPlayerTwoPlaying] = useState(false);
    const [winnerFound, setWinnerFound] = useState(false);

    function changePlayer() {
        if (currentPlayer === "P1") {
            setPlayerOnePlaying(!playerOnePlaying);
            setPlayerTwoPlaying(!playerTwoPlaying);
            setPlayerOneScore((playerOneScore) => playerOneScore + turnTotal);
            setTurnTotal(0);
            setCurrentPlayer("P2");
        } else {
            setPlayerOnePlaying(!playerOnePlaying);
            setPlayerTwoPlaying(!playerTwoPlaying);
            setPlayerTwoScore((playerTwoScore) => playerTwoScore + turnTotal);
            setTurnTotal(0);
            setCurrentPlayer("P1");
        }
        if (playerOneScore >= gameLength) {
            setWinnerFound(true);
        } else if (playerTwoScore >= gameLength) {
            setWinnerFound(true);
        }
    }
    function handleRollButton() {
        const randomNumber = Math.floor(Math.random() * 6 + 1);
        setLastRoll(randomNumber);
        if (playerOnePlaying === true && lastRoll === 1) {
            setTurnTotal(0);
            setPlayerOnePlaying(!playerOnePlaying);
            setPlayerTwoPlaying(!playerTwoPlaying);
            setCurrentPlayer("P2");
        } else if (playerTwoPlaying === true && lastRoll === 1) {
            setTurnTotal(0);
            setPlayerOnePlaying(!playerOnePlaying);
            setPlayerTwoPlaying(!playerTwoPlaying);
            setCurrentPlayer("P1");
        } else {
            setTurnTotal((turnTotal) => turnTotal + randomNumber);
        }
    }

    if (playerOneScore >= gameLength) {
        console.log("1 wins");
    } else if (playerTwoScore >= gameLength) {
        console.log("2 wins");
    }

    function shortGame() {
        setGameLength(30);
        setCurrentPlayer("P1");
        setTurnTotal(0);
        setLastRoll(null);
        setPlayerOneScore(0);
        setPlayerTwoScore(0);
        setWinnerFound(false);
    }

    function longGame() {
        setGameLength(100);
        setCurrentPlayer("P1");
        setTurnTotal(0);
        setLastRoll(null);
        setPlayerOneScore(0);
        setPlayerTwoScore(0);
        setWinnerFound(false);
    }

    function Pig(pig) {
        return (
            <div className="pig">
                <section className="mini-section">
                    {winnerFound ? (
                        <button
                            onClick={handleRollButton}
                            className="rollButton"
                            disabled
                        >
                            Roll!
                        </button>
                    ) : (
                        <button
                            onClick={handleRollButton}
                            className="rollButton"
                        >
                            Roll!
                        </button>
                    )}
                    <p className="last-roll">
                        {pig.previousRoll}: {lastRoll === null ? "-" : lastRoll}
                    </p>
                    <p className="turn-total">
                        {pig.numberOfTurns}: {turnTotal}
                    </p>
                    <button onClick={changePlayer} className="stickButton">
                        Stick!
                    </button>
                </section>
            </div>
        );
    }

    return (
        <div className="game-box">
            <h1>🐷 Game of Pig 🐷 </h1>
            <h2>(First to {gameLength})</h2>
            <p className="player">
                Player 1 : {playerOneScore}{" "}
                {playerOnePlaying ? <>(Playing)</> : ""}
            </p>
            <p className="player">
                Player 2 : {playerTwoScore}{" "}
                {playerTwoPlaying ? <>(Playing)</> : ""}
            </p>

            <Pig
                previousRoll="Last Roll"
                numberOfTurns="Turn Total"
                roll={[0]}
                turns={[10]}
            ></Pig>

            <button className="newShortGameButton" onClick={shortGame}>
                New Short Game
            </button>
            <button className="newGameButton" onClick={longGame}>
                New Game
            </button>
        </div>
    );
}
