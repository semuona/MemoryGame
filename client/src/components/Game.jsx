import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MemoryGame } from "../Context";
import Cover from "./images/galaxy.jpg";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function Game() {
  //CONTEXT
  const {
    player1,
    player2,
    selectedCards,
    setSelectedCards,
    gameOver,
    setGameOver,
    pics,
  } = useContext(MemoryGame);

  //STATES
  const [turn, setTurn] = useState(false); //true = player2, false = player1
  const [scorePlayer1, setScorePlayer1] = useState([]);
  const [scorePlayer2, setScorePlayer2] = useState([]);
  const [wrongGuessesPlayer1, setWrongGuessesPlayer1] = useState(0);
  const [wrongGuessesPlayer2, setWrongGuessesPlayer2] = useState(0);
  const [leftCards, setLeftCards] = useState([...pics]);

  useEffect(() => {
    //-------------------IF-MATCH--------------------------
    if (selectedCards.length === 2) {
      if (
        //---If it is not same cards selected twice
        leftCards.indexOf(selectedCards[0]) !==
          leftCards.indexOf(selectedCards[1]) &&
        selectedCards[0].id === selectedCards[1].id
      ) {
        selectedCards[0].open = true;
        selectedCards[1].open = true;

        //----removing matching cards from total array
        /*     const arrayWithoutMatchedCards = leftCards.filter(
          (item) => item.id !== selectedCards[0].id
        );
        setLeftCards(arrayWithoutMatchedCards);

 */
        //--Triggering the game over state or the turn state
        scorePlayer1.length + scorePlayer2.length === 7
          ? setGameOver(true)
          : setTurn(!turn);

        //reset selected cards
        setSelectedCards([]);

        //--Depending on whose turn it is, add score to player1 or player2
        !turn
          ? scorePlayer1.push(selectedCards[0])
          : scorePlayer2.push(selectedCards[0]);
      } else {
        //-------------------NO--MATCH------------------------

        !turn
          ? setWrongGuessesPlayer1(wrongGuessesPlayer1 + 1)
          : setWrongGuessesPlayer2(wrongGuessesPlayer2 + 1);

        setTurn(!turn);
        setSelectedCards([]);
        setTurn(!turn);
      }
    }
  }, [selectedCards, turn, gameOver]);

  const handleSelect = (pic) => {
    setSelectedCards([...selectedCards, pic]);
  };
  //---Calculate the winner
  const calculateWinner = () => {
    if (scorePlayer1.length > scorePlayer2.length) {
      return "Winner is: " + player1 || "Player 1";
    } else if (scorePlayer1.length < scorePlayer2.length) {
      return "Winner is: " + player2 || "Player 2";
    } else {
      return "Well Done Both! It's a Draw";
    }
  };

  // shuffle the cards every time the page is loaded
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        {" "}
        <Link
          to="/"
          style={{
            color: "whitesmoke",
            textDecoration: "none",
            cursor: "pointer",
            padding: "20px",
            display: "flex",

            alignItems: "center",
          }}
        >
          <ArrowCircleLeftIcon style={{ marginRight: "10px" }} /> Go back
        </Link>{" "}
        <button
          onClick={() => {
            setGameOver(false);
            shuffle(pics);
            setLeftCards([...pics]);
            setScorePlayer1([]);
            setScorePlayer2([]);
            setWrongGuessesPlayer1(0);
            setWrongGuessesPlayer2(0);
          }}
        >
          Reset The Game
        </button>{" "}
      </div>
      <div className="mainContainer">
        <div className="player1Container">
          <h1
            className="playersName"
            style={{
              color: !turn && "yellow",
              border: !turn && "4px solid yellow",
            }}
          >
            {player1 === "" ? "player 1" : player1}
          </h1>
          <div> Score is: {scorePlayer1?.length}</div>
          <div>Wrong guesses: {wrongGuessesPlayer1}</div>
          <div>
            {scorePlayer1?.map((card, index) => (
              <img
                key={index + card.id + index}
                className="guessedCard"
                src={card.url}
                alt="planet"
              />
            ))}
          </div>
        </div>
        <div className="gameContainer ">
          {leftCards?.map((pic, index) => {
            return (
              <>
                <div
                  className={
                    pic?.open ? "flip-container hide" + index : "flip-container"
                  }
                  key={index + pic.id}
                >
                  <div className="flipper">
                    <div
                      style={{ backgroundImage: `url(${Cover})` }}
                      className="picContainer front"
                      onClick={() => {
                        handleSelect(pic);
                      }}
                    ></div>
                    <img
                      className="picContainer back"
                      onClick={() => {
                        handleSelect(pic);
                      }}
                      src={pic.url}
                      alt="planet"
                    />
                  </div>
                </div>
              </>
            );
          })}

          {gameOver ? (
            <div className="gameOverContainer">
              <div>
                <h1>Game Over</h1>
                <p>
                  <span style={{ color: "yellow" }}>{calculateWinner()}</span>
                </p>
                <button
                  onClick={() => {
                    setScorePlayer1([]);
                    setScorePlayer2([]);
                    setWrongGuessesPlayer1(0);
                    setWrongGuessesPlayer2(0);
                    setGameOver(false);
                    shuffle(pics);
                    setLeftCards([...pics]);
                  }}
                >
                  Play again
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <div className="player2Container">
          <h1
            className="playersName"
            style={{
              color: turn && "yellow",
              border: turn && "4px solid yellow",
            }}
          >
            {player2 === "" ? "player 2" : player2}
          </h1>
          <div> Score is: {scorePlayer2?.length}</div>
          <div>Wrong guesses: {wrongGuessesPlayer2}</div>
          <div>
            {scorePlayer2?.map((card, index) => (
              <img
                key={index + card.id + index + card.id}
                className="guessedCard"
                src={card.url}
                alt="planet"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="save">
        {" "}
        {/*   <button disabled >Save The game</button> */}
      </div>
    </div>
  );
}
