'use client'

import { ShopContext } from "@/context/ShopContext";
import { ProductDocument } from "@/models/Product";
import { Anchor, AppShell, Badge, Box, Button, Card, Center, Container, Divider, Flex, Grid, Group, Image, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
                    <Title style={{ color: 'var(--mantine-color-gray-8)' }} order={6}>
                        ${primaryVariation.price}
                    </Title>
                </Card>
            </Box>
        )
    })

    return (
        <Container>
            <Title order={3}>This is where you get books.</Title>
            <Text>{shopData.about}</Text>
            <Divider my="lg" />
            {cards.length !== 0 ? (
            <Flex
                direction={{ base: 'column', xs: 'row' }}
                gap={{ base: 'xs', xs: 'lg' }}
                justify="center"
                wrap="wrap"
            >
                {cards}
            </Flex>) :
                (
                    <Center>No Products Available!</Center>
                )
            }
            <Divider my="lg" ></Divider>
        </Container>
    )
}
