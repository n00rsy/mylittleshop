import { getShopByUrl } from "@/actions/shop";
import { Badge, Button, Card, Grid, Group, Image, Text, Title } from "@mantine/core";
import ShopPage from "./ShopPage";

export default async function ShopLayout({ params }: { params: any }) {

    const { url } = params
    const shopData = await getShopByUrl(url)

    return (
        <ShopPage shopData={shopData} />
    )
}
