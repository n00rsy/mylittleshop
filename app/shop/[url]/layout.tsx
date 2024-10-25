import { getShopByUrl } from "@/actions/shop";
import ShopLayout from "../ShopLayout";
import { ShopProvider } from "@/context/ShopContext";
import { redirect } from "next/navigation";

export default async function Layout({ params, children }: { params: any, children: any }) {

    const { url } = params
    const shopData = await getShopByUrl(url)
    if (!shopData || 'error' in shopData) {
        redirect('/404')
    }
    return (
        <ShopProvider initialShopData={shopData}>
                {children}
        </ShopProvider>
    )
}
