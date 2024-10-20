
'use client'
import { redirect, useParams } from "next/navigation";
import { IconBuildingWarehouse, IconHome, IconHome2, IconLogout, IconSettings } from '@tabler/icons-react';
import { Text, Stack, AppShell, Title, Burger, Group, Center, NavLink, Loader, Button, Container, Box, Avatar, Menu, rem, Anchor } from '@mantine/core';
import { upperFirst, useDisclosure } from '@mantine/hooks';
import React, { ForwardRefExoticComponent, ReactNode, useContext, useEffect, useState } from "react";

import { signOut, useSession } from "next-auth/react";
import { DashboardContext } from "@/context/DashboardContext";
import ShopSelector from "@/components/ShopSelector/ShopSelector";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export const PageContext = React.createContext(null);

export default function DashboardAppShellLayout({ userData, children }: { userData: any, children: ReactNode }) {
    console.log("dashboard layout function...", userData)
    const router = useRouter()
    const { data: session, status } = useSession();
    const [activePage, setActivePage] = useState('home')
    const [opened, { toggle }] = useDisclosure();
    const { setUserData, setActiveShopIndex } = useContext(DashboardContext)
    setUserData(userData)

    const pathname = usePathname();
    const {shopindex} = useParams()
    useEffect(() => {
        console.log(`Route changed to: ${pathname}`);
        const tokens = pathname.split('/')
        console.log('setting active page: ', tokens[2])
        setActivePage(tokens[3])
      }, [pathname]);

    useEffect(() => {
        console.log("LAYOUT MOUNTED")
        return () => {
            console.log("LAYOUT UNMOUNTED")
        }
    }, [])
    console.log("shopindex: ", shopindex)
    if (shopindex >= userData.shops.length) {
        router.push('/404')
    }
    setActiveShopIndex(Number(shopindex))
    interface Page {
        title: string,
        icon: ForwardRefExoticComponent<any>
    }

    const pages:Page[] = [{title:'home', icon: IconHome}, {title: 'products', icon: IconBuildingWarehouse}, {title: 'orders', icon: IconHome}, {title:'settings', icon: IconSettings}]

    const navlinks = pages.map((page) => {
        return (<NavLink
                    href={`${page.title}`}
                    label={upperFirst(page.title)}
                    leftSection={<page.icon size="1rem" stroke={1.5} />}
                    data-active={activePage === page.title || undefined}
                    key={page.title}
                />)
    })



    const center = (children: ReactNode) => {
        return (
        <Center style={{ height: '50vh' }}>
            {children}
        </Center>
        )
    }
    const info = () => {
        if (status === "loading") {
            return center((<Loader />))
        }
        if (userData && userData.shops.length == 0) {
            return center((
                <>
                    <Stack>
                        <Container>
                            <Text>
                                Looks like you don't have any shops.
                            </Text>
                            <Button component="a" href="/wizard">Create a Shop</Button>
                        </Container>
                    </Stack>
                </>
            ))
        }
        else {
            return children
        }
    }

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Center w="100%" h="100%" pr={10} pl={10}>
                    <Group justify="flex-start" w="100%" h="100%">
                        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="md" />
                        <Title visibleFrom="xs">
                            mylittleshop
                        </Title>
                        <Box flex={1}></Box>
                        <Group justify="flex-end" gap="md">
                            <ShopSelector activeShopIndex={shopindex} activePage={activePage} shops={userData?.shops || []} />
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
            <AppShell.Navbar p="md">
                {navlinks}
            </AppShell.Navbar>
            <AppShell.Main>
                    {info()}
            </AppShell.Main>
        </AppShell>
    )
}
