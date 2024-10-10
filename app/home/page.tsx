"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff } from '@tabler/icons-react';
import { Text, Stack, AppShell, Burger, Group, Center, NavLink, Loader, Button, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <>
            <Stack>
                <Text>
                    Looks like you don't have any shops.
                </Text>
        <Button component="a" href="/wizard">Create a Shop</Button>
        </Stack>
        </>
      );
    } else if (status === "loading") {
      return <Loader />;
    } else {
        router.push("/login");
    }
  };
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          LOGO HERE
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
      <NavLink
        href="#required-for-focus"
        label="Home"
        leftSection={<IconHome2 size="1rem" stroke={1.5} />}
      />
      <NavLink
        href="#required-for-focus"
        label="Products"
        leftSection={<IconHome2 size="1rem" stroke={1.5}/>}
      />
      <NavLink
        href="#required-for-focus"
        label="Orders"
        leftSection={<IconHome2 size="1rem" stroke={1.5}/>}
      />
      </AppShell.Navbar>
      <AppShell.Main>

        <Center style={{height: '50vh'}}>
        {showSession()}
        </Center>
        </AppShell.Main>
    </AppShell>
  );
}
