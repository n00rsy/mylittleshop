import { ReactNode } from "react";
import { Text, Stack, AppShell, Flex, Title, Burger, Group, Center, NavLink, Loader, Button, Container, Box, Avatar, Menu, rem, Anchor } from '@mantine/core';
import { IconBuildingStore, IconChevronDown, IconHome2, IconLogout, IconPlus, IconSettings } from '@tabler/icons-react';


export default function ShopSelector({ shops }: { shops: [any] }) {
    console.log("shopsmenu data: ", shops)
    const shopItems = shops.map((shop) => {
        return (
        <Menu.Item key={shop._id} leftSection={<IconBuildingStore style={{ width: rem(14), height: rem(14) }} />}>
            {shop.name}
        </Menu.Item>
    )})

    if (shops.length > 0) {

        return (<Menu shadow="md" width={200}>
            <Menu.Target>
                <Button variant="subtle">
                    <Group>
                        <Text>{shops[0].name}</Text>
                        <IconChevronDown style={{ width: rem(14), height: rem(14) }} />
                    </Group>
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                {shopItems}
                <Menu.Divider />
                <Menu.Item leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}>
                    Create new shop
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>)
    }

    return (
        <></>
    )
}
