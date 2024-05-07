'use client';
import Game from '@/components/game/game';
import History from '@/components/history/History';
import Timer from '@/components/timer/Timer';
import WinnerSnackbar from '@/components/winner-snackbar/WinnerSnackbar';
import { useGameContext } from '@/contexts/GameContext';
import { Box, Button, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useState } from 'react';

export default function GamePage() {
  const { winnerInGame, resetStates } = useGameContext();

  return (
    <>
      <WinnerSnackbar />
      <Box
        display="flex"
        sx={{
          mt: 4,
          ml: 2,
          textAlign: 'center',
        }}
      >
        <Box
          component="aside"
          sx={{
            width: '250px',
            margin: '0 20px',
            padding: '0 20px',
            borderRight: '1px solid gray',
          }}
        >
          <Button
            variant="contained"
            component={NextLink}
            href="/"
            onClick={() => resetStates()}
          >
            Return Back
          </Button>
          <Typography variant="h5" component="h5" m="20px 0 40px">
            <Timer stopGame={!!winnerInGame}/>
          </Typography>
        </Box>

        <Box display="flex">
          <Box
            component="main"
            sx={{ display: 'block', minWidth: '500px', height: '90vh' }}
          >
            <Game />
          </Box>
          <Box
            component="nav"
            sx={{
              margin: '0 20px',
              minWidth: '250px',
              padding: '0 20px',
              borderLeft: '1px solid gray',
            }}
          >
            <History />
          </Box>
        </Box>
      </Box>
    </>
  );
}
