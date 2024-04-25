'use client';
import Game from '@/components/game/game';
import History from '@/components/history/history';
import { Box } from '@mui/material';

export default function GamePage() {
  return (
    <Box display="flex">
      <Box
        component="main"
        sx={{
          mt: 4,
          ml:2,
          textAlign: 'center'
        }}
      >
        <Game />
      </Box>
      <Box component="nav">
        <History />
      </Box>
    </Box>
  );
}
