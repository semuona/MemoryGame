import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MemoryGame = createContext();

const SERVER_URI = "http://localhost:8080";

export default function MemoryGameProvider({ children }) {
  //------------States ---------

  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});
  const [selectedCards, setSelectedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [pics, setPics] = useState([]);

  //---------Getting the cards from the server-------
  useEffect(() => {
    const getPictures = async () => {
      // const res = await axios.get(`${SERVER_URI}/cards/getPic`);
      const res = await axios.get(`/cards/getPic`);
      const pictures = Object.values(res.data);

      setPics(pictures);
      // console.log("pictures", pictures);
    };
    getPictures();
  }, [gameOver]);

  return (
    <MemoryGame.Provider
      value={{
        player1,
        setPlayer1,
        player2,
        setPlayer2,
        selectedCards,
        setSelectedCards,
        gameOver,
        setGameOver,
        pics,
        setPics,
      }}
    >
      {children}
    </MemoryGame.Provider>
  );
}
