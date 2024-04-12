'use client';

import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

export default function InitialPage() {
  const router = useRouter();

  return (
    <Box
      display='flex'
      alignItems='center'
      flexDirection='column'
    >
      <Typography
        variant='h2'
        component='h2'
        m='20px 0 40px'
      >
        Tic-Tac-Toe Game
      </Typography>
      <Button
        variant='contained'
        onClick={() => router.push('/game')}
      >
        Start Game
      </Button>
    </Box>
  );
}
