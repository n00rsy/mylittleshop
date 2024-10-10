import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import type { Metadata } from "next";
import { Provider } from "./provider";
import { Session } from 'inspector/promises';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

// export default function RootLayout({ children }: { children: any }) {
//   return (
//     <html lang="en">
//       <head>
//         <ColorSchemeScript />
//         <link rel="shortcut icon" href="/favicon.svg" />
//         <meta
//           name="viewport"
//           content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
//         />
//       </head>
//       <body>
//         <MantineProvider theme={theme}>{children}</MantineProvider>
//       </body>
//     </html>
//   );
// }

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
      <Provider>
        <body>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </body>
      </Provider>
    </html>
  );
}
