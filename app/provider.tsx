'use client';

import { ThemeProvider } from "@/context/ThemeContext";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { SessionProvider } from "next-auth/react";
import MantineThemeProvider from "./MantineThemeProvider";

type Props = {
  children?: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      {/* <MantineThemeProvider>
        <ModalsProvider>
          <Notifications /> */}
          {children}
        {/* </ModalsProvider>
      </MantineThemeProvider> */}
    </SessionProvider>);
};
