import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MemoryGame } from "../Context";
export default function Game() {
  const {
    player1,
    setPlayer1,
    player2,
    setPlayer2,
    allCards,
    setAllCards,
    selectedCards,
    setSelectedCards,
    score,
    setScore,
    gameStarted,
    setGameStarted,
    gameOver,
    setGameOver,
    pics,
  } = useContext(MemoryGame);
  const [turn, setTurn] = useState(false);
  const [scorePlayer1, setScorePlayer1] = useState([]);
  const [scorePlayer2, setScorePlayer2] = useState([]);
  const [leftCards, setLeftCards] = useState([...pics]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      if (selectedCards[0] === selectedCards[1]) {
        leftCards.splice(leftCards.indexOf(selectedCards[0]), 2);
        leftCards.length === 0 ? setGameOver(true) : setTurn(!turn);
        setSelectedCards([]);
        !turn
          ? scorePlayer1.push(selectedCards[0])
          : scorePlayer2.push(selectedCards[0]);
        setTurn(!turn);

        console.log("leftcards are", leftCards);
        console.log("match");
      } else {
        console.log("no match");
        setSelectedCards([]);
        setTurn(!turn);
      }
    }
  }, [selectedCards, turn]);

  console.log("selected", selectedCards);

  const handleSelect = (pic) => {
    setSelectedCards([...selectedCards, pic]);
  };

  return (
    <div>
      <Link to="/">Go back</Link>
      <div className="mainContainer">
        <div className="player1Container">
          <h1 style={{ color: !turn && "green" }}>
            {player1 === "" ? "player 1" : player1}
          </h1>
          <div> score is:{scorePlayer1?.length}</div>
          <div>
            {scorePlayer1?.map((card, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid black",
                  width: "100px",
                  height: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {card}
              </div>
            ))}
          </div>
        </div>
        <div className="gameContainer">
          {leftCards?.map((pic, index) => {
            return (
              <div
                className="picContainer"
                key={index}
                onClick={() => handleSelect(pic)}
              >
                {pic}
              </div>
            );
          })}

          {gameOver ? (
            <div>
              <h1>Game Over</h1>
              <p>
                Winner is:{" "}
                {scorePlayer1.length > scorePlayer2.length ? player1 : player2}
              </p>{" "}
            </div>
          ) : null}
        </div>
        <div className="player2Container">
          <h1 style={{ color: turn && "green" }}>
            {player2 === "" ? "player 2" : player2}
          </h1>
          <div> score is:{scorePlayer2?.length}</div>
          <div>
            {scorePlayer2?.map((card, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid black",
                  width: "100px",
                  height: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
