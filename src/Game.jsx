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
            const newScore = playerOneScore + turnTotal;
            setPlayerOneScore(newScore);

            if (newScore >= gameLength) {
                setWinnerFound(true);
                alert("Player 1 Wins!");
            }

            setTurnTotal(0);
            setCurrentPlayer("P2");
            setPlayerOnePlaying(!playerOnePlaying);
            setPlayerTwoPlaying(!playerTwoPlaying);
        } else {
            const newScore = playerTwoScore + turnTotal;
            setPlayerTwoScore(newScore);

            if (newScore >= gameLength) {
                setWinnerFound(true);
                alert("Player 2 Wins!");
            }

            setTurnTotal(0);
            setCurrentPlayer("P1");
            setPlayerOnePlaying(!playerOnePlaying);
            setPlayerTwoPlaying(!playerTwoPlaying);
        }
    }

    function handleRollButton() {
        const randomNumber = Math.floor(Math.random() * 6 + 1);
        setLastRoll(randomNumber);
        if (randomNumber === 1) {
            setTurnTotal(0);
            setCurrentPlayer("P2");
            setPlayerOnePlaying(!playerOnePlaying);
            setPlayerTwoPlaying(!playerTwoPlaying);
        } else {
            setTurnTotal((turnTotal) => turnTotal + randomNumber);
        }
    }

    function shortGame() {
        setGameLength(30);
        setCurrentPlayer("P1");
        setTurnTotal(0);
        setLastRoll(null);
        setPlayerOneScore(0);
        setPlayerTwoScore(0);
        setPlayerOnePlaying(true);
        setPlayerTwoPlaying(false);
        setWinnerFound(false);
    }

    function longGame() {
        setGameLength(100);
        setCurrentPlayer("P1");
        setTurnTotal(0);
        setLastRoll(null);
        setPlayerOneScore(0);
        setPlayerTwoScore(0);
        setPlayerOnePlaying(true);
        setPlayerTwoPlaying(false);
        setWinnerFound(false);
    }

    function Indicator() {
        return <>🐽</>;
    }

    function Pig(pig) {
        return (
            <div className="pig">
                <section className="mini-section">
                    {winnerFound ? (
                        <button
                            onClick={handleRollButton}
                            className="rollButton"
                            disabled={winnerFound}
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

                    {winnerFound ? (
                        <button
                            onClick={changePlayer}
                            className="stickButton"
                            disabled={winnerFound}
                        >
                            Stick!
                        </button>
                    ) : (
                        <button onClick={changePlayer} className="stickButton">
                            Stick!
                        </button>
                    )}
                </section>
            </div>
        );
    }

    return (
        <div className="game-box">
            <h1>🐷 Game of Pig 🐷 </h1>
            <h2>(First to {gameLength})</h2>
            <p className="player">
                {playerOnePlaying ? <Indicator /> : ""}P1 score :{" "}
                {playerOneScore}
            </p>
            <p className="player">
                {playerTwoPlaying ? <Indicator /> : ""}P2 score :{" "}
                {playerTwoScore}
            </p>

            <Pig previousRoll="Last Roll" numberOfTurns="Turn Total"></Pig>

            <button className="newShortGameButton" onClick={shortGame}>
                New Short Game
            </button>
            <button className="newGameButton" onClick={longGame}>
                New Game
            </button>
        </div>
    );
}
