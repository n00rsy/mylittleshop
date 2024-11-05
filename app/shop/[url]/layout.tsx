import { getShopByUrl } from "@/actions/shop";
import { ShopProvider } from "@/context/ShopContext";
import { redirect } from "next/navigation";
import ShopLayout from "../ShopLayout";
import { MantineProvider } from "@mantine/core";

export default async function Layout({ params, children }: { params: any, children: any }) {

    const { url } = params
    const shopData = await getShopByUrl(url)
    if (!shopData || 'error' in shopData) {
        redirect('/404')
    }
    return (
        <MantineProvider>
            <ShopProvider initialShopData={shopData}>
                <ShopLayout shopData={shopData}>
                    {children}
                </ShopLayout>
            </ShopProvider>
        </MantineProvider>
    )
}
