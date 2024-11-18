'use client'

import { getShopByUrl } from "@/actions/shop";
import { ShopContext } from "@/context/ShopContext";
import { ProductDocument } from "@/models/Product";
import { Anchor, AppShell, Badge, Box, Button, Card, Center, Container, Divider, Flex, Grid, Group, Image, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAt, IconBasket, IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";
import { useContext } from "react";

export default function ShopPage() {
    console.log("entering page function.")
    const { shopData } = useContext(ShopContext)
    console.log("Shop page shopData", shopData)

    const cards = shopData.products.map((product: ProductDocument) => {

        const primaryVariation = product.variations[0].variationOptions.find(vo => vo.primary)

        return (
            <Box key={product._id} style={{ width: 290 }}>
                <Card shadow="sm" padding="sm" radius="md" withBorder component="a" href={`${shopData.url}/product/${product.url}`}>
                    <Card.Section>
                        <Image
                            src={product.images[0]}
                            height={250}
                            alt={product.name}
                        />
                    </Card.Section>

                    <Text >{product.name}</Text>
                    <Title style={{color: 'var(--mantine-color-gray-8)'}} order={6}>
                        ${primaryVariation.price}
                    </Title>
                </Card>
            </Box>
        )
    })

    const [opened, { toggle }] = useDisclosure();

    return (
            <Container>
                <Title order={3}>This is where you get books.</Title>
                <Text>{shopData.about}</Text>
                <Divider my="lg" ></Divider>
                {cards.length !== 0 ? (<Flex
                    direction={{ base: 'column', xs: 'row' }}
                    gap={{ base: 'xs', xs: 'lg' }}
                    justify={{ sm: 'center' }}
                    wrap="wrap"
                >
                    {cards}
                </Flex>) :
                (
                    <Center>No Products Available!</Center>
                )
            }
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
                            built with <Anchor style={{ color: shopData.styles.primaryColor }} href='https://simplestorefront.io'>simplestorefront.io</Anchor>
                        </Text>


                    </Stack>
                </Center>
            </Container>

    )
}
