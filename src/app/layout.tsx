import * as React from 'react';
import ColorContextProvider from '@/contexts/ColorContext';
import MainThemeContext from '../contexts/MainThemeContext';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <MainThemeContext>
          <ColorContextProvider>
            {props.children}
          </ColorContextProvider>
        </MainThemeContext>
      </body>
    </html>
  );
}
