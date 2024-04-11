'use client';
import Board from '../board/board';
import Grid from '@mui/material/Grid';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useGameContext } from '@/contexts/GameContext';
import { useMemo } from 'react';

export default function Game() {
  const { history, jumpTo } = useGameContext();

  const moves = useMemo(() => history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <ListItem
        disablePadding
        key={move}
      >
        <ListItemButton
          sx={{ p: '0 5px', m: '5px 0', border: '1px solid grey' }}
          onClick={() => jumpTo(move)}
        >
          <ListItemText primary={description} />
        </ListItemButton>
      </ListItem>
    );
  }), [history, jumpTo]);

  return (
    <Grid container>
      <Grid item>
        <Board />
      </Grid>
      <Grid item>
        <Box p={2}>
          <List>{moves}</List>
        </Box>
      </Grid>
    </Grid>
  );
}
