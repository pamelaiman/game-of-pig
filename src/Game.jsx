import { useState } from "react";

function Player(player) {
    return (
        <div className="player">
            <p>
                {player.title}: {player.score}
            </p>
        </div>
    );
}

function Pig(pig) {
    return (
        <div className="pig">
            <section className="mini-section">
                <button className="rollButton">Roll!</button>
                <p className="last-roll">
                    {pig.previousRoll}: {pig.roll}
                </p>
                <p className="turn-total">
                    {pig.numberOfTurns}: {pig.turns}
                </p>
                <button className="stickButton">Stick!</button>
            </section>
        </div>
    );
}

export function Game() {
    const [gameLength, setGameLength] = useState(30);

    function shortGame() {
        setGameLength(30);
    }

    function longGame() {
        setGameLength(100);
    }

    return (
        <div className="game-box">
            <h1>🐷 Game of Pig 🐷 </h1>
            <h2>(First to {gameLength})</h2>
            <Player title="P1 Score" score={[10]} />
            <Player title="P2 Score" score={[20]} />
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
