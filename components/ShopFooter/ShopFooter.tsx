import { Center, Group, Stack, Title, Text, Anchor } from "@mantine/core";
import { IconAt, IconBrandInstagram, IconBrandFacebook } from "@tabler/icons-react";


export default function ShopFooter({ color }: { color: string }) {
    return (
        <Center ta="center" pb={50} pt={50}>
            <Stack>
                <Title order={3}>Contact</Title>
                <Group>
                    <IconBrandInstagram />
                    <Text>ibnnoorsybooks</Text>


                    <IconBrandFacebook />
                    <Text>ibnnoorsybooks</Text>


                    <IconAt />
                    <Text>testemail@test.com</Text>
                </Group>

                <Text>
                    built with <Anchor style={{ color: color }} href='https://simplestorefront.io'>simplestorefront.io</Anchor>
                </Text>
            </Stack>
        </Center>
    )
}
