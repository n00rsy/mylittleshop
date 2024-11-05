'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff } from '@tabler/icons-react';
import { Text, AppShell, Burger, Group, Skeleton, NavLink, Loader, Button, Anchor, Container, Title, Flex, Center, MantineProvider } from '@mantine/core';
import { useEffect } from "react";

export default function Landing() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      return (
        router.push("/dashboard/")
      );
    }
  }, [session, status, router])
  return (
    <AppShell
      navbar={{ width: 300, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Header>
        <Container fluid>
          <Flex justify="flex-start">
            <Title visibleFrom="xs">
              mylittleshop
            </Title>
            <Container flex={1}></Container>
            <Group justify="flex-end" gap="md">
              <Anchor href="/signup">Sign up</Anchor>
              <Button component="a" href="/login">Login</Button>
            </Group>
          </Flex>
        </Container>
      </AppShell.Header>
      <AppShell.Main>

        <Center>Please buy this saas!</Center>

      </AppShell.Main>
    </AppShell>
  )
}
