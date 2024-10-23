"use client"

import { getShopByUrl } from "@/actions/shop";
import { Badge, Button, Card, Grid, Group, Image, Text, Title } from "@mantine/core";

export default function ShopLayout({ shopData }: { shopData: any }) {

    console.log(shopData.products)

    const cards = shopData.products.map((product) => {
        return (
            <Grid.Col>
                <Card shadow="sm" padding="lg" radius="md" withBorder >
                    <Card.Section>
                        <Image
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                            height={160}
                            alt="Norway"
                        />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                        <Text fw={500}>{product.name}</Text>
                        <Badge color="pink">On Sale</Badge>
                    </Group>

                    <Text size="sm" c="dimmed">
                        {product.description}
                    </Text>

                    <Button color="blue" fullWidth mt="md" radius="md">
                        Book classic tour now
                    </Button>
                </Card>
            </Grid.Col>
        )
    })

    return (
        <>
            <Title>{shopData.name}</Title>

            <Grid>
                {cards}
            </Grid>

            {JSON.stringify(shopData)}

        </>
    )
}
