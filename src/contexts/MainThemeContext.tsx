'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import { PropsWithChildren } from 'react';
import GameProvider from './GameContext';

export default function MainThemeContext({ children }: PropsWithChildren) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GameProvider>{children}</GameProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
