"use client";

import { DashboardProvider } from "@/context/DashboardContext";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <MantineProvider>
        <ModalsProvider>
          {children}
        </ModalsProvider>
      </MantineProvider>
    </SessionProvider>);
};
