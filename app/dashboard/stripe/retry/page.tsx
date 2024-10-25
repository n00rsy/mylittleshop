'use client'

import { DashboardContext } from "@/context/DashboardContext";
import { Anchor, Button, Stack, Title, Center } from "@mantine/core";
import { useContext } from "react";
import { useRouter } from 'next/navigation';
import { updateStripeAccount } from "@/actions/stripe";

export default function Retry() {

    const { userData } = useContext(DashboardContext)
    const router = useRouter()

    const handleretrystripe = async () => {
        const accountLink = await updateStripeAccount(userData.stripe.accountId)
        console.log(accountLink)
        if (accountLink) {
            router.push(accountLink)
        }
    }

    return (
        <Center>
            <Stack>
                <Title>Something went wrong with your Stripe registration.</Title>
                <Button onClick={handleretrystripe}>Click to Return to Stripe</Button>
                <Anchor href="/dashboard">Return to Dashboard</Anchor>
            </Stack>
        </Center>
    )
}
