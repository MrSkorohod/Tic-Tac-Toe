import * as React from 'react';
import LanguageContextProvider from '@/contexts/ColorContext';
import MainThemeContext from '../contexts/MainThemeContext';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MainThemeContext>
          <LanguageContextProvider>
            {props.children}
          </LanguageContextProvider>
        </MainThemeContext>
      </body>
    </html>
  );
}
