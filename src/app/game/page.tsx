'use client';
import Game from '@/components/game/game';
import GameProvider from '@/contexts/GameContext';
import { Box } from '@mui/material';

export default function GamePage() {
  return (
    <Box
      sx={{
        m: 4,
      }}
    >
      <Game />
    </Box>
  );
}
