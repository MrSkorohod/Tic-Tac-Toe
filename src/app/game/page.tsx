'use client';
import Game from '@/components/game/game';
import History from '@/components/history/History';
import { useGameContext } from '@/contexts/GameContext';
import { Alert, AlertTitle, Box } from '@mui/material';

export default function GamePage() {
  const { winnerInGame } = useGameContext();
  return (
    <>
      {!!winnerInGame && (
        <Alert severity='success'>
          <AlertTitle>Winner!</AlertTitle>
          Player {winnerInGame} win
        </Alert>
      )}

      <Box display='flex'>
        <Box
          component='main'
          sx={{
            mt: 4,
            ml: 2,
            textAlign: 'center',
          }}
        >
          <Game />
        </Box>
        <Box component='nav'>
          <History />
        </Box>
      </Box>
    </>
  );
}
