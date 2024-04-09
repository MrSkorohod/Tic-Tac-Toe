import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Game from '@/components/game/game';

export default function Home() {
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
