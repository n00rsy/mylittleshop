import { Text,  Group,  Button,  Menu, rem } from '@mantine/core';
import { IconBuildingStore, IconChevronDown,  IconPlus, } from '@tabler/icons-react';
import { redirect, useRouter } from 'next/navigation';

export default function ShopSelector({ shops, activePage, activeShopIndex }: { shops: [any], activePage: any, activeShopIndex: any }) {
    const router = useRouter()
    const shopItems = shops.map((shop, index) => {
        return (
        <Menu.Item onClick={() => {router.push(`/dashboard/${index}/${activePage}`)}} key={shop._id} leftSection={<IconBuildingStore style={{ width: rem(14), height: rem(14) }} />}>
            {shop.name}
        </Menu.Item>
    )})

    if (shops.length > 0 && activeShopIndex != null) {

        return (<Menu shadow="md" width={200}>
            <Menu.Target>
                <Button variant="subtle">
                    <Group>
                        <Text>{shops[activeShopIndex].name}</Text>
                        <IconChevronDown style={{ width: rem(14), height: rem(14) }} />
                    </Group>
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                {shopItems}
                <Menu.Divider />
                <Menu.Item  onClick={() => {router.push(`/wizard`)}} leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}>
                    Create new shop
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>)
    }

    return (
        <></>
    )
}
