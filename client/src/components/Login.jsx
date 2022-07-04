import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { MemoryGame } from "../Context";
import Button from "@mui/material/Button";
import axios from "axios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function Login() {
  const { setPlayer1, setPlayer2, player1, player2, pics, setGameOver } =
    useContext(MemoryGame);
  const [savedPlayer1, setSavedPlayer1] = useState(false);
  const [savedPlayer2, setSavedPlayer2] = useState(false);
  const navigate = useNavigate();

  const handleLoginPlayer1 = async () => {
    if (!player1.name) alert("Please enter and save your name");

    const response1 = await axios.post("/players/login", player1);

    if (response1.data.success) {
      setPlayer1({ ...response1.data.player });
    }
  };
  const handleLoginPlayer2 = async () => {
    if (!player2.name) alert("Please enter and save your name");

    const response2 = await axios.post("/players/login", player2);

    if (response2.data.success) {
      setPlayer2({ ...response2.data.player });
    }
  };

  // shuffle the cards every time after loading the game
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
    <div className="loginContainer">
      <div>
        <div>
          {" "}
          <h3>Player one</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Player One"
              variant="outlined"
              placeholder="Enter your name"
              value={player1?.name}
              onChange={(e) => setPlayer1({ name: e.target.value })}
              required
            />
            <Button
              style={{ margin: "0 15px" }}
              onClick={(e) => {
                handleLoginPlayer1();
                setSavedPlayer1(true);
              }}
            >
              SAVE
            </Button>
            {savedPlayer1 && (
              <CheckCircleOutlineIcon
                style={{ color: "green", fontSize: "3rem" }}
              />
            )}
          </div>
        </div>

        <div>
          <h3>Player two</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Player Two"
              placeholder="Enter your name"
              variant="outlined"
              value={player2?.name}
              onChange={(e) => setPlayer2({ name: e.target.value })}
              required
            />
            <Button
              style={{ margin: "0 15px" }}
              onClick={(e) => {
                handleLoginPlayer2();
                setSavedPlayer2(true);
              }}
            >
              SAVE
            </Button>
            {savedPlayer2 && (
              <CheckCircleOutlineIcon
                style={{ color: "green", fontSize: "3rem" }}
              />
            )}
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          if (
            (!player1.name && !player2.name) ||
            !savedPlayer1 ||
            !savedPlayer2
          ) {
            alert("Please ENTER and SAVE your name");
          } else {
            shuffle(pics);
            //  setGameOver(false);
            navigate("/game");
          }
        }}
      >
        Next
      </Button>
    </div>
  );
}
