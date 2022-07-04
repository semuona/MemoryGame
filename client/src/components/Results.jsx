import React, { useEffect, useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Link } from "react-router-dom";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { MemoryGame } from "../Context";

function createData(name, totalScore, victories) {
  return { name, totalScore, victories };
}

export default function Results() {
  const { player1, player2, gameOver } = useContext(MemoryGame);

  const [results, setResults] = useState([]);
  useEffect(() => {
    const getResults = async () => {
      const res = await axios.get(`/games/list`);

      setResults([...res.data.games]);
    };
    getResults();
  }, [player1, player2, gameOver]);
  const rows = [
    results?.map((result) => {
      return createData(result.name, result.totalScore, result.victories);
    }),
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <TableContainer sx={{ maxWidth: 950 }} component={Paper}>
        <Table sx={{ maxWidth: 950 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Player's Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Total score
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Victories
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows[0]?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.totalScore}</TableCell>
                <TableCell align="right">{row.victories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link
        to="/game"
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
    </div>
  );
}
