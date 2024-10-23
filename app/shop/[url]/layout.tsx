import { getShopByUrl } from "@/actions/shop";
import { Badge, Button, Card, Grid, Group, Image, Text, Title } from "@mantine/core";
import ShopLayout from "./ShopLayout";

export default async function Shop({ params }: { params: any }) {

    const { url } = params
    const shopData = await getShopByUrl(url)

    return (
        <ShopLayout shopData={shopData}
        />
    )
}
