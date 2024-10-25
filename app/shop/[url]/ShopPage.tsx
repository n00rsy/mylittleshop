'use client'

import { getShopByUrl } from "@/actions/shop";
import { Anchor, AppShell, Badge, Box, Button, Card, Center, Container, Divider, Flex, Grid, Group, Image, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAt, IconBasket, IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";

export default function ShopPage({ shopData }: { shopData: any }) {

    console.log(shopData.products)

    const cards = shopData.products.map((product) => {
        return (
            <div>
                <Card shadow="sm" padding="sm" radius="md" withBorder component="a" href={`${shopData.url}/product/${product.url}`}>
                    <Card.Section>
                        <Image
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                            height={250}
                            alt={product.name}
                        />
                    </Card.Section>

                    <Title order={5}>{product.name}</Title>
                    <Title order={6}>
                        ${product.price}
                    </Title>
                </Card>
            </div>
        )
    })

    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            header={{ height: 60 }}
            padding={200}
            style={{


            }}
        >
            <AppShell.Header style={{ backgroundColor: shopData.colors.primary }}>
                <Center w="100%" h="100%" pr={20} pl={20}>
                    <Group justify="flex-start" w="100%" h="100%">
                        <Title pl={50}>{shopData.name}</Title>
                        <Box flex={1}></Box>
                        <Button color={shopData.colors.accent}><IconBasket /></Button>
                    </Group>
                </Center>

            </AppShell.Header>

            <Container pt={100}>
                <Title order={3}>This is where you get books.</Title>
                <Text>{shopData.about}</Text>
                <Divider my="lg" ></Divider>
                <Flex
                    direction={{ base: 'column', xs: 'row' }}
                    gap={{ base: 'sm', sm: 'lg' }}
                    justify={{ sm: 'center' }}
                >
                    {cards}
                </Flex>
                <Divider my="lg" ></Divider>
                <Center ta="center" pb={50}>
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
                            built with <Anchor style={{ color: shopData.colors.accent }} href='https://simplestorefront.io'>simplestorefront.io</Anchor>
                        </Text>


                    </Stack>
                </Center>
            </Container>
            {/* {JSON.stringify(shopData)} */}
            <AppShell.Footer>
            </AppShell.Footer>
        </AppShell >
    )
}
