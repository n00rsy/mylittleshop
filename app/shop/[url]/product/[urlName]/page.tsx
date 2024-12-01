'use client'

import { ShopContext } from "@/context/ShopContext";
import { useContext } from "react";
import React, { useState } from 'react';
import { Container, Grid, Image, Text, NumberInput, Button, Group, Title, Flex, Box, Stack, Paper, Divider, Select, } from '@mantine/core';
import { useRouter } from "next/navigation";
import { addItemToCart, emptyCart } from "@/utils/cartUtils";

// TODO: copy this layout - https://www.bangcookies.com/products/kitchen-sink-cookie

export default function ProductPage({ params }: { params: any }) {
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const router = useRouter()
    const { urlName } = params
    const { shopData, cartItems, setCartItems } = useContext(ShopContext)
    console.log(shopData)
    const product = shopData.products.find((p) => p.url == urlName)
    const defaultVariation = product.variations[0].variationOptions.find(vo => vo.primary)
    const [activeVariation, setActiveVariation] = useState(defaultVariation)

    if (!product) {
        router.push('/shop/404')
    }
    const handleAddToBag = () => {
        const productDetails = {
            _id: `${product._id}-${activeVariation._id}`,
            name: product.name,
            images: product.images,
            url: product.url,
            quantity: 1, // default
            variationName: product.variations[0].name,
            variationDetails: {
                name: activeVariation.name,
                price: activeVariation.price,
                quantity: activeVariation.quantity
            }
        }
        console.log("adding to cart: ", productDetails)
        emptyCart(setCartItems)
        addItemToCart(productDetails, cartItems, setCartItems)
        console.log(cartItems)
    };

    const handleVariationChange = (newVariation?: string) => {
        if (!newVariation) {
            setActiveVariation(defaultVariation)
        }
        setActiveVariation(product.variations[0].variationOptions.find(vo => vo.name == newVariation))
    }

    const variationPickers = () => {
        if (product.variations[0].variationOptions.length == 1) {
            return (
                <></>
            )
        }

        return product.variations.map((variation: any) => {
            return(
                <Select
                    key={variation.name}
                    label={variation.name}
                    defaultValue={defaultVariation}
                    data={variation.variationOptions.map((op) => op.name)}
                    value={activeVariation.name}
                    onChange={(value) => handleVariationChange(value)}
                />
            )
        })
    }

    return (
        <Container size="xl">
            <Stack>
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    gap={{ base: 'sm', sm: 'sm' }}
                    justify={{ sm: 'center' }}
                >
                    <Box>
                        {product.images.length > 0 ?
                            (<Group> {product.images.map((image, index) =>
                                (<Image key={index} src={image} alt={product.name} radius="md" />))}
                            </Group>) : (<Image src="https://via.placeholder.com/300" alt="Placeholder" radius="md" />)}
                    </Box>
                    <Box pr={40} h={0} m={0}></Box>
                    <Flex justify="flex-start" w="100%" h="100%" direction="column" style={{ flexGrow: 1 }}>
                        <Box flex={1} />
                        <Box>
                            <Title order={2}>{product.name}</Title>
                            <Text size="xl" mb="md">
                                ${activeVariation.price.toFixed(2)}
                            </Text>

                            <Group align="flex-end">
                                {variationPickers()}
                            </Group>

                            <Group pt={10} align="flex-end">
                                <Button onClick={handleAddToBag}>Add to Cart</Button>
                            </Group>
                        </Box>
                        <Box flex={1} />
                    </Flex>
                </Flex>
                <Divider />
                <Paper style={{
                    backgroundColor: shopData.styles.mantineColor[0]
                }}>
                    <Text size="sm" mb="md">
                        {product.description}
                    </Text>
                </Paper>
            </Stack>
        </Container>);
};
