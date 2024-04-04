'use client';
import { useState } from 'react';
import Board from '../board/board';
import Grid from '@mui/material/Grid';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

export default function Game() {
  const [history, setHistory] = useState<string[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <ListItem disablePadding key={move}>
        <ListItemButton
          sx={{ p: '0 5px',m: '5px 0', border: '1px solid grey' }}
          onClick={() => jumpTo(move)}
        >
          <ListItemText primary={description} />
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <Grid container>
      <Grid item>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </Grid>
      <Grid item>
        <Box p={2}>
          <List>{moves}</List>
        </Box>
      </Grid>
    </Grid>
  );
}
