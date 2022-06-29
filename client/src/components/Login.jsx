import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { MemoryGame } from "../Context";
import Button from "@mui/material/Button";
export default function Login() {
  const { setPlayer1, setPlayer2, player1, player2, pics, setGameOver } =
    useContext(MemoryGame);

  const navigate = useNavigate();

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
        <h3>Player one</h3>
        <TextField
          id="outlined-basic"
          label="Player One"
          variant="outlined"
          placeholder="Enter your name"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          required
        />
        <h3>Player two</h3>
        <TextField
          id="outlined-basic"
          label="Player Two"
          placeholder="Enter your name"
          variant="outlined"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          required
        />
      </div>
      <Button
        onClick={() => {
          if (!player1 && !player2) {
            navigate("/game");
            setPlayer1("Player 1");
            setPlayer2("Player 2");
            shuffle(pics);
            setGameOver(false);
          } else {
            shuffle(pics);
            setGameOver(false);
            navigate("/game");
          }
        }}
      >
        Next
      </Button>
    </div>
  );
}
