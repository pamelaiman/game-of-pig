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

        if (playerOneScore >= gameLength || playerTwoScore >= gameLength) {
            if (playerOneScore >= gameLength) {
                setWinnerFound(true)
            } else if (playerTwoScore >= gameLength) {
                setWinnerFound(true)
            }
        } else {

            if (currentPlayer === "P1") {
                setPlayerOnePlaying(!playerOnePlaying);
                setPlayerTwoPlaying(!playerTwoPlaying);
                if (turnTotal === 1) {
                    setPlayerOneScore((playerOneScore) => playerOneScore + 0);
                } else { setPlayerOneScore((playerOneScore) => playerOneScore + turnTotal); }
                setTurnTotal(0);
                setCurrentPlayer("P2");
            } else {
                setPlayerOnePlaying(!playerOnePlaying);
                setPlayerTwoPlaying(!playerTwoPlaying);
                if (turnTotal === 1) {
                    setPlayerTwoScore((playerTwoScore) => playerTwoScore + 0);
                } else { setPlayerTwoScore((playerTwoScore) => playerTwoScore + turnTotal); }
                setTurnTotal(0);
                setCurrentPlayer("P1");
            }
        }

    }

    function handleRollButton() {

        if (playerOneScore >= gameLength || playerTwoScore >= gameLength) {
            if (playerOneScore >= gameLength) {
                setWinnerFound(true)
                setPlayerOnePlaying(true)
                setPlayerTwoPlaying(false)
            } else if (playerTwoScore >= gameLength) {
                setWinnerFound(true)
                setPlayerOnePlaying(false)
                setPlayerTwoPlaying(true)

            }
        } else {
            const randomNumber = Math.floor(Math.random() * 6);
            setLastRoll(randomNumber);
            if (lastRoll === 1) {
                setTurnTotal(0)
                setPlayerOnePlaying(!playerOnePlaying);
                setPlayerTwoPlaying(!playerTwoPlaying);
            } else {
                setTurnTotal((turnTotal) => turnTotal + randomNumber);
            }
        }
    }

    if (playerOneScore >= gameLength) {
        console.log("1 wins")
    } else if (playerTwoScore >= gameLength) {
        console.log("2 wins")
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
        setCurrentPlayer("P1")
        setTurnTotal(0);
        setLastRoll(null);
        setPlayerOneScore(0);
        setPlayerTwoScore(0);
        setWinnerFound(false);
    }

    function Indicator() {
        if (winnerFound === true) {
            return (<>🏆</>)
        } else {
            return (<>🐽</>)
        }
    }


    function Pig(pig) {
        return (
            <div className="pig">
                <section className="mini-section">
                    {winnerFound ? <button className="rollButton" disabled >Roll!</button> :
                        <button onClick={handleRollButton} className="rollButton" >Roll!</button>}
                    <p className="last-roll">
                        {pig.previousRoll}: {lastRoll === null ? "-" : lastRoll}
                    </p>
                    <p className="turn-total">
                        {pig.numberOfTurns}: {turnTotal}
                    </p>
                    {winnerFound ? <button className="stickButton" disabled>Stick!</button> :
                        <button onClick={changePlayer} className="stickButton">Stick!</button>}
                </section>
            </div>
        );
    }

    return (
        <>
            <h3 style={{ textAlign: "center" }}>Welcome to the Ultimate Pig game</h3>
            <div className="game-box">
                <h1>🐷 Game of Pig 🐷 </h1>
                <h2>(First to {gameLength})</h2>
                <p className="player">{playerOnePlaying ? <Indicator /> : ""}P1 score : {playerOneScore}</p>
                <p className="player">{playerTwoPlaying ? <Indicator /> : ""}P2 score : {playerTwoScore}</p>

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
        </>
    );
}