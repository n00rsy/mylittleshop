
'use client'
import { signOut } from "next-auth/react";
import { IconBuildingStore, IconChevronDown, IconHome2, IconLogout, IconPlus, IconSettings } from '@tabler/icons-react';
import { Text, Stack, AppShell, Flex, Title, Burger, Group, Center, NavLink, Loader, Button, Container, Box, Avatar, Menu, rem, Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { createShop } from "@/actions/shop";
import Shop from "@/models/Shop";
import React, { ReactNode, useEffect, useState } from "react";
import ShopSelector from "../ShopSelector/ShopSelector";
export function DashboardHeader({ shops }: { shops: [any] }) {

    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell.Header>
            <Center w="100%" h="100%" pr={10} pl={10}>
                <Group justify="flex-start" w="100%" h="100%">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="md" />
                    <Title visibleFrom="xs">
                        mylittleshop
                    </Title>
                    <Box flex={1}></Box>
                    <Group justify="flex-end" gap="md">

                        <ShopSelector shops = {shops} />

                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <Anchor variant="subtle">
                                    <Avatar src={null} />
                                </Anchor>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                                    Settings
                                </Menu.Item>
                                <Menu.Item onClick={() => { signOut({ redirect: true, callbackUrl: '/' }) }} leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}>
                                    Sign out
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>
            </Center>
        </AppShell.Header>
    )
}
