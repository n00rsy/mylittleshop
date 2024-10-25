import '@mantine/core/styles.css';
import 'mantine-datatable/styles.layer.css';

import React from 'react';
import { ColorSchemeScript } from '@mantine/core';
import { Provider } from "./provider";

export const metadata = {
  title: 'mylittleshop',
  description: 'mylittleshop',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Provider>
         {children}
        </Provider>
      </body>

    </html>
  );
}
