"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff } from '@tabler/icons-react';
import { Text, AppShell, Burger, Group, Skeleton, NavLink, Loader, Button, Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from "react";

export default function Landing() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      return (
        router.push("/home")
      );
    }
  }, [session, status, router])
  return (
    <AppShell
      navbar={{ width: 300, breakpoint: 'sm'}}
      padding="md"
    >
      <AppShell.Header>
        <Text visibleFrom="xs">
        LOGO HERE
        </Text>
        <Group justify="flex-end" gap="md">
          <Anchor href="/signup">Sign up</Anchor>
          <Button component="a" href="/login">Login</Button>
        </Group>
      </AppShell.Header>
      <AppShell.Main>please buy this saas!!!</AppShell.Main>
    </AppShell>
  )
}
