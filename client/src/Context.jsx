import { createContext, useState, useEffect } from "react";

export const MemoryGame = createContext();

export default function MemoryGameProvider({ children }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [allCards, setAllCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const pics = [
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
  ];

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
