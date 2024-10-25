
'use client'
import { redirect, useParams } from "next/navigation";
import { IconBuildingWarehouse, IconHome, IconHome2, IconLogout, IconSettings, IconTruckDelivery } from '@tabler/icons-react';
import { Text, Stack, AppShell, Title, Burger, Group, Center, NavLink, Loader, Button, Container, Box, Avatar, Menu, rem, Anchor } from '@mantine/core';
import { upperFirst, useDisclosure } from '@mantine/hooks';
import React, { ForwardRefExoticComponent, ReactNode, useContext, useEffect, useState } from "react";

import { signOut, useSession } from "next-auth/react";
import { DashboardContext } from "@/context/DashboardContext";
import ShopSelector from "@/components/ShopSelector/ShopSelector";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { createStripeSession } from "@/actions/stripe";
import { loadConnectAndInitialize } from "@stripe/connect-js";
import { ConnectComponentsProvider } from "@stripe/react-connect-js";

export const PageContext = React.createContext(null);

export default function Dashboard({ children }: { children: ReactNode }) {

    const router = useRouter()
    const { data: session, status } = useSession();
    const [activePage, setActivePage] = useState('home')
    const [opened, { toggle }] = useDisclosure();
    const { userData, setActiveShopIndex } = useContext(DashboardContext)
    console.log("dashboard function...", userData)

    const pathname = usePathname();
    let { shopindex } = useParams()
    shopindex = shopindex || userData!.defaultShop || "0"
    useEffect(() => {
        console.log(`Route changed to: ${pathname}`);
        const tokens = pathname.split('/')
        console.log('setting active page: ', tokens[2])
        setActivePage(tokens[3])
    }, [pathname]);

    console.log("shopindex: ", shopindex)
    if (shopindex >= userData.shops.length && userData.shops.length > 0) {
        router.push('/404')
    }
    setActiveShopIndex(Number(shopindex))

    const [stripeConnectInstance] = useState(() => {
        const fetchClientSecret = async () => {
            // Fetch the AccountSession client secret
            const response = await createStripeSession(userData.stripe.accountId)
            if (response.error || !response.secret) {
                console.log('An error occurred: ', response.error);
                return 'undefined';
            } else {
                return response.secret
            }
        }

        return loadConnectAndInitialize({
            publishableKey: "pk_test_51Q8XYOBVzl031WfEm2up9ZUe7p5haysZ0M2DkbwWvrbVqqZndl80lbJ95eT0HXOL3Noie6h3qbALiWvrhgku9cqH00IavQKXrZ",
            fetchClientSecret: fetchClientSecret,
            appearance: {
                overlays: 'dialog',
                variables: {
                    colorPrimary: '#625afa',
                },
            },
        })
    });

    interface Page {
        title: string,
        icon: ForwardRefExoticComponent<any>
    }

    const pages: Page[] = [{ title: 'home', icon: IconHome }, { title: 'products', icon: IconBuildingWarehouse }, { title: 'orders', icon: IconTruckDelivery }, { title: 'settings', icon: IconSettings }]

    const navlinks = pages.map((page) => {
        return (<NavLink
            href={`/dashboard/${shopindex}/${page.title}`}
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
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
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
                                        <Menu.Item component="a" href="/dashboard/usersettings" leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
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
        </ConnectComponentsProvider>
    )
}
