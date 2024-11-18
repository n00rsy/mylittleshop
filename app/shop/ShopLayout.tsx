'use client'

import { AppShell, Box, Button, Center, Group, Title } from "@mantine/core";
import { IconBasket } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function ShopLayout({ children, shopData }: { children: any, shopData: any }) {

    const [cart, setCart] = useState({})

    useEffect(() => {
        const savedCart = localStorage.getItem("cart")
        if (savedCart)
            setCart(savedCart)
    }, [])

    // When user submits the form, save the favorite number to the local storage
    //   const saveToLocalStorage = (e) => {
    //     e.preventDefault()
    //     localStorage.setItem("favoriteNumber", favoriteNumber)
    //   }

    return (
        <AppShell
            header={{ height: 60 }}
            padding={30}
            style={{
            }}
        >
            <AppShell.Header style={{ backgroundColor: shopData.styles.primaryColor }}>
                <Center w="100%" h="100%" pr={20} pl={20}>
                    <Group justify="flex-start" w="100%" h="100%">
                        <Title pl={50}>{shopData.name}</Title>
                        <Box flex={1}></Box>
                        <Button><IconBasket /></Button>
                    </Group>
                </Center>
            </AppShell.Header>
            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    )
}
