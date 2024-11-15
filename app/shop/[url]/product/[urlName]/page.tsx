'use client'

import { ShopContext } from "@/context/ShopContext";
import { useContext } from "react";
import React, { useState } from 'react';
import { Container, Grid, Image, Text, NumberInput, Button, Group, Title, } from '@mantine/core';
import { useRouter } from "next/navigation";


export default function ProductPage({ params }: { params: any }) {
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const router = useRouter()
    const { url } = params
    const { shopData } = useContext(ShopContext)
    const product = shopData.products.find((p) => p.url == url)
    if (!product) {
        router.push('/shop/404')
    }
    const handleAddToBag = () => { // Implement add to bag functionality here
        console.log(`Added ${selectedQuantity} of ${product.name} to the bag.`);
    };
    return (
        <Container>
            <Grid gutter="md">
                <Grid.Col
                >
                    {product.images.length > 0 ?
                        (<Group> {product.images.map((image, index) =>
                            (<Image key={index} src={image} alt={product.name} radius="md" />))}
                        </Group>) : (<Image src="https://via.placeholder.com/300" alt="Placeholder" radius="md" />)}
                </Grid.Col>
                <Grid.Col>
                    <Title order={2}>{product.name}</Title>
                    <Text size="sm" color="dimmed" mb="md">
                        {product.description}
                    </Text>
                    <Text size="xl" mb="md">
                        ${product.price.toFixed(2)}
                    </Text> <Group align="flex-end">
                        <NumberInput label="Quantity" value={selectedQuantity} onChange={(val) => setSelectedQuantity(val)} min={1} max={product.quantity} styles={{ input: { width: '80px' } }} />
                        <Button onClick={handleAddToBag}>Add to Bag</Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </Container>);
};
