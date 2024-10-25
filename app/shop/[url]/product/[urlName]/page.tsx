import { Title } from "@mantine/core";


export default function ProductPage({ params }: { params: any }) {
    const { urlName } = params
    console.log("urlName: ", urlName)
    return (
        <Title>
            Product Page
        </Title>
    )
}
