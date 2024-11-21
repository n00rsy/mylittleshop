'use client'

import ShopFooter from "@/components/ShopFooter/ShopFooter";
import { ShopContext } from "@/context/ShopContext";
import { emptyCart } from "@/utils/cartUtils";
import { AppShell, Box, Button, Center, Container, Divider, Drawer, Flex, Group, Image, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBasket } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";

export default function ShopLayout({ children, shopData }: { children: any, shopData: any }) {

    const [opened, { open, close }] = useDisclosure(false);
    const { cartItems, setCartItems } = useContext(ShopContext)
    const cartItemEntries = cartItems.map((item: any) => {
        return (
            <Box>
                <Flex direction="row" gap="md">
                    <Image
                        src={item.images[0]}
                        h={100}
                        w="auto"
                        fit="contain"
                    ></Image>
                    <Stack>
                        <Title order={4}>
                            {item.name}
                        </Title>
                        <Text>${item.variationDetails.price} </Text>
                        <Text>{item.variationName}: {item.variationDetails.name}</Text>
                        <Text>Quantity: {item.quantity}</Text>
                    </Stack>
                </Flex>
                <Button variant="outline">Remove</Button>
            </Box>
        )
    })

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
                        <a href={`/shop/${shopData.url}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            <Title pl={50}>{shopData.name}</Title>
                        </a>
                        <Box flex={1}></Box>
                        <Button onClick={open}><IconBasket /></Button>
                    </Group>
                </Center>
            </AppShell.Header>
            <AppShell.Main h="100vh">
                <Flex h="100%" direction="column">
                    {children}
                    <Box flex={1} />
                    <ShopFooter color={shopData.styles.primaryColor} />
                </Flex>
                <Drawer position="right" opened={opened} onClose={close} withCloseButton={false}>
                    {cartItemEntries}
                    <Divider mt={20} mb={20}/>
                    <Text>Estimated tax & fees: $10000.00</Text>
                    <Text>Total: 100000.000</Text>
                    <Button fullWidth>Checkout</Button>
                </Drawer>
            </AppShell.Main>

        </AppShell>

    )
}
