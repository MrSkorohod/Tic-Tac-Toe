'use client';
import Game from '@/components/game/game';
import History from '@/components/history/History';
import WinnerSnackbar from '@/components/winner-snackbar/WinnerSnackbar';
import { useGameContext } from '@/contexts/GameContext';
import { Box, Button } from '@mui/material';
import NextLink from 'next/link';

export default function GamePage() {
  const { numberCellsOnField, resetStates } = useGameContext();

  return (
    <>
      <WinnerSnackbar />
      <Box
        display='flex'
        sx={{
          mt: 4,
          ml: 2,
          textAlign: 'center',
        }}
      >
        <Box
          component='aside'
          sx={{ width: '250px' }}
        >
          <Button
            variant='contained'
            component={NextLink}
            href='/'
            onClick={() => resetStates()}
          >
            Return Back
          </Button>
        </Box>

        <Box display='flex'>
          <Box component='main'>
            <Game />
          </Box>
          <Box component='nav'>
            <History />
          </Box>
        </Box>
      </Box>
    </>
  );
}
