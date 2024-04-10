import * as React from 'react';
import MainThemeContext from '../contexts/MainThemeContext';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <MainThemeContext>
            {props.children}
        </MainThemeContext>
      </body>
    </html>
  );
}
