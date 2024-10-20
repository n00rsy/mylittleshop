"use client";
import { IconBuildingStore, IconChevronDown, IconHome2, IconLogout, IconPlus, IconSettings } from '@tabler/icons-react';
import { Text, Stack, AppShell, Flex, Title, Burger, Group, Center, NavLink, Loader, Button, Container, Box, Avatar, Menu, rem, Anchor, JsonInput } from '@mantine/core';

import { createShop } from "@/actions/shop";
import { useParams } from 'next/navigation';

export default function Home(props: any) {
    const {userData} = props
    const handlecreate = async () => {

        let testShop = {
            theme: "light",
            colors: {
                primary: "string",
                secondary: "string",
                accent: "string"
            },
            url: "asdfbookstore",
            name: "A S D F Bookstore",
            tagline: "Bookstore for asdf books",
            products: []
        }

        const r = await createShop(testShop, userData._id)
        console.log(r)

    }
    return (
        <Center style={{ height: '50vh' }}>
            <Container>
                    <Stack>
                        <Text >
                            {JSON.stringify(userData, null, 2)}
                        </Text>
                        <Button component="a" href="/wizard">Create a Shop</Button>
                        <Button onClick={() => handlecreate()}>Create Test Shop</Button>

                    </Stack>
                </Container>
        </Center>
    );
}
