import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MemoryGame = createContext();

export default function MemoryGameProvider({ children }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [allCards, setAllCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [pics, setPics] = useState([]);
  /*   const pics = [
    "1",
    "1",
    "2",
    "2",
    "3",
    "3",
    "4",
    "4",
    "5",
    "5",
    "6",
    "6",
    "7",
    "7",
    "8",
    "8",
  ]; */
  useEffect(() => {
    const getPictures = async () => {
      const res = await axios.get("cards/getPic");
      const pictures = Object.values(res.data);

      setPics(pictures);
      console.log("pictures", pictures);
    };
    getPictures();
  }, []);

  return (
    <MemoryGame.Provider
      value={{
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
      }}
    >
      {children}
    </MemoryGame.Provider>
  );
}
