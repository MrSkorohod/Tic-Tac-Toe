'use client';

import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';

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
        component={NextLink}
        href='/game'
      >
        Start Game
      </Button>
    </Box>
  );
}
