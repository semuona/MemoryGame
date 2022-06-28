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
  const [wrongGuessesPlayer1, setWrongGuessesPlayer1] = useState(0);
  const [wrongGuessesPlayer2, setWrongGuessesPlayer2] = useState(0);

  const [leftCards, setLeftCards] = useState([...pics, ...pics]);

  useEffect(() => {
    //-------------MATCH--------------
    if (selectedCards.length === 2) {
      if (selectedCards[0] === selectedCards[1]) {
        // leftCards.splice(leftCards.indexOf(selectedCards[0]), 2);
        const newArray = leftCards.filter(
          (item) => item.id !== selectedCards[0]
        );
        console.log("index", newArray);
        setLeftCards(newArray);

        leftCards.length === 0 ? setGameOver(true) : setTurn(!turn);
        setSelectedCards([]);
        console.log("leftCards", leftCards);
        !turn
          ? scorePlayer1.push(selectedCards[0])
          : scorePlayer2.push(selectedCards[0]);
      } else {
        !turn
          ? setWrongGuessesPlayer1(wrongGuessesPlayer1 + 1)
          : setWrongGuessesPlayer2(wrongGuessesPlayer2 + 1);
        setTurn(!turn);

        console.log("no match");
        setSelectedCards([]);
        setTurn(!turn);
      }
    }
  }, [selectedCards, turn]);

  console.log("selected", selectedCards);

  const handleSelect = (id) => {
    setSelectedCards([...selectedCards, id]);
  };

  return (
    <div>
      <Link to="/">Go back</Link>
      <div className="mainContainer">
        <div className="player1Container">
          <h1 style={{ color: !turn && "green" }}>
            {player1 === "" ? "player 1" : player1}
          </h1>
          <div>Wrong guesses: {wrongGuessesPlayer1}</div>
          <div> score is:{scorePlayer1?.length}</div>
          <div>
            {scorePlayer1?.map((card, index) => (
              <div key={index} className="guessedCard">
                {card}
              </div>
            ))}
          </div>
        </div>
        <div className="gameContainer ">
          {leftCards?.map((pic, index) => {
            return (
              <>
                <div className="flip-container" key={index}>
                  <div className="flipper">
                    <div
                      className="picContainer front"
                      onClick={() => handleSelect(pic.id)}
                    ></div>
                    <div
                      className="picContainer back"
                      onClick={() => handleSelect(pic.id)}
                    >
                      {pic.id}
                    </div>
                  </div>
                </div>
              </>
            );
          })}

          {gameOver ? (
            <div>
              <h1>Game Over</h1>
              <p>
                Winner is:{" "}
                {scorePlayer1.length > scorePlayer2.length
                  ? player1 === ""
                    ? "Player 1"
                    : player1
                  : player2 === ""
                  ? "Player 2"
                  : player2}
              </p>{" "}
            </div>
          ) : null}
        </div>
        <div className="player2Container">
          <h1 style={{ color: turn && "green" }}>
            {player2 === "" ? "player 2" : player2}
          </h1>
          <div>Wrong guesses: {wrongGuessesPlayer2}</div>
          <div> score is:{scorePlayer2?.length}</div>
          <div>
            {scorePlayer2?.map((card, index) => (
              <div key={index} className="guessedCard">
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
