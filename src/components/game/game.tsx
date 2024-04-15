'use client';
import Board from '../board/board';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
} from '@mui/material';
import { useGameContext } from '@/contexts/GameContext';
import { useMemo } from 'react';
import NextLink from 'next/link';

export default function Game() {
  const { history, jumpTo } = useGameContext();

  const moves = useMemo(
    () =>
      history.map((squares, move) => {
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
      }),
    [history, jumpTo]
  );

  return (
    <Grid container>
      <Grid item>
        <Board />
        <Button
          variant='contained'
          component={NextLink}
          href='/'
          sx={{
          mt: '20px'
        }}
        >
          Return Back
        </Button>
      </Grid>
      <Grid item>
        <Box p={2}>
          <List>{moves}</List>
        </Box>
      </Grid>
    </Grid>
  );
}
