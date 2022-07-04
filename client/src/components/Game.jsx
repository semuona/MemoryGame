import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MemoryGame } from "../Context";
import Cover from "./images/galaxy.jpg";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import axios from "axios";

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
    setPlayer1,
    setPlayer2,
  } = useContext(MemoryGame);

  //STATES
  const [flip, setFlip] = useState({
    index: null,
    trans: "transform: rotateY(180deg)",
  });
  const [turn, setTurn] = useState(false); //true = player2, false = player1
  const [scorePlayer1, setScorePlayer1] = useState([]);
  const [scorePlayer2, setScorePlayer2] = useState([]);

  const [player1TotalScore, setplayer1TotalScore] = useState(
    player1?.totalScore || 0
  );
  const [player2TotalScore, setplayer2TotalScore] = useState(
    player2?.totalScore || 0
  );
  const [player1VictoriesCurrentGame, setPlayer1VictoriesCurrentGame] =
    useState(0);
  const [player2VictoriesCurrentGame, setPlayer2VictoriesCurrentGame] =
    useState(0);
  const [player1Victories, setPlayer1Victories] = useState(
    player1?.victories || 0
  );
  const [player2Victories, setPlayer2Victories] = useState(
    player2?.victories || 0
  );
  const [wrongGuessesPlayer1, setWrongGuessesPlayer1] = useState(0);
  const [wrongGuessesPlayer2, setWrongGuessesPlayer2] = useState(0);
  const [leftCards, setLeftCards] = useState([...pics]);
  const [winner, setWinner] = useState(false);

  //-----sending updated player info to backend-----
  const newPlayer1Info = {
    name: player1.name,
    totalScore: player1TotalScore + scorePlayer1.length,
    victories: player1.victories + player1VictoriesCurrentGame,
  };
  const newPlayer2Info = {
    name: player2.name,
    totalScore: player2TotalScore + scorePlayer2.length,
    victories: player2.victories + player2VictoriesCurrentGame,
  };

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

        //--Triggering the game over state or the turn state
        if (scorePlayer1.length + scorePlayer2.length === 7) {
          setGameOver(true);
          setWinner(true);

          setTurn(!turn);
        }

        //reset selected cards
        setSelectedCards([]);

        //--Depending on whose turn it is, add score to player1 or player2
        !turn
          ? scorePlayer1.push(selectedCards[0]) && setTurn(false)
          : scorePlayer2.push(selectedCards[0]) && setTurn(true);
      } else {
        //-------------------NO--MATCH------------------------

        !turn
          ? setWrongGuessesPlayer1(wrongGuessesPlayer1 + 1) && setTurn(true)
          : setWrongGuessesPlayer2(wrongGuessesPlayer2 + 1) && setTurn(false);

        setTurn(!turn);
        setSelectedCards([]);
      }
    }
  }, [selectedCards, gameOver, player1Victories, player2Victories]);

  const handleSelect = (pic) => {
    setSelectedCards([...selectedCards, pic]);
  };
  //---Calculate the winner
  const calculateWinner = () => {
    if (scorePlayer1.length > scorePlayer2.length) {
      return "Winner is: " + player1.name || "Player 1";
    } else if (scorePlayer1.length < scorePlayer2.length) {
      return "Winner is: " + player2.name || "Player 2";
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
  useEffect(() => {
    if (gameOver) {
      if (scorePlayer1.length > scorePlayer2.length) {
        setPlayer1VictoriesCurrentGame(player1VictoriesCurrentGame + 1);
      } else if (scorePlayer1.length < scorePlayer2.length) {
        setPlayer2VictoriesCurrentGame(player2VictoriesCurrentGame + 1);
      } else if (scorePlayer1.length === scorePlayer2.length) {
        setPlayer1VictoriesCurrentGame(player1VictoriesCurrentGame + 1) &&
          setPlayer2VictoriesCurrentGame(player2VictoriesCurrentGame + 1);
      }
    }
  }, [winner]);

  useEffect(() => {
    if (gameOver) {
      const updatePlayerInfo = async (e) => {
        try {
          const response1 = await axios.patch(
            `/players/addinfo/${player1._id}`,
            newPlayer1Info
          );
          if (response1.data.success) {
            setPlayer1({ ...response1.data.player });
          }

          const response2 = await axios.patch(
            `/players/addinfo/${player2._id}`,
            newPlayer2Info
          );
          if (response1.data.success) {
            setPlayer2({ ...response2.data.player });
          }
        } catch (error) {
          console.log("our error is", error.message);
        }
      };
      updatePlayerInfo();
    }
  }, [player1VictoriesCurrentGame, player2VictoriesCurrentGame]);

  const handleFlip = (idx) => {
    setFlip({
      ...flip,
      index: idx,
    });
    setTimeout(() => {
      setFlip({
        index: null,
        trans: "transform: rotateY(180deg)",
      });
    }, 2000);
  };
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
        <Link
          to="/results"
          style={{
            color: "whitesmoke",
            textDecoration: "none",
            cursor: "pointer",
            padding: "20px",
            display: "flex",

            alignItems: "center",
          }}
        >
          {" "}
          Check results <ArrowCircleRightIcon style={{ marginLeft: "10px" }} />
        </Link>{" "}
        <button
          onClick={() => {
            setScorePlayer1([]);
            setScorePlayer2([]);
            setWrongGuessesPlayer1(0);
            setWrongGuessesPlayer2(0);
            setGameOver(false);
            shuffle(pics);
            for (let i = 0; i < pics.length; i++) {
              pics[i].open = false;
            }
            setLeftCards([...pics]);
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
            {player1 === "" ? "player 1" : player1?.name}
          </h1>
          <div> Score is: {scorePlayer1?.length}</div>
          <div>Wrong guesses: {wrongGuessesPlayer1}</div>
          <div>Victories: {player1.victories || 0}</div>
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
              <div key={index + pic.id}>
                <div
                  className={
                    pic?.open ? "flip-container hide" + index : "flip-container"
                  }
                  onClick={() => handleFlip(index)}
                >
                  <div
                    className="flipper"
                    style={{
                      transform:
                        flip.index === index
                          ? "rotateY(180deg)"
                          : "rotateY(0deg)",
                    }}
                  >
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
              </div>
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
            {player2 === "" ? "player 2" : player2?.name}
          </h1>
          <div> Score is: {scorePlayer2?.length}</div>
          <div>Wrong guesses: {wrongGuessesPlayer2}</div>
          <div>Victories: {player2.victories || 0}</div>
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
      <div className="save"> </div>
    </div>
  );
}
