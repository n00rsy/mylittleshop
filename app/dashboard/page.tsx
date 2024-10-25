

'use client'

import { DashboardContext } from "@/context/DashboardContext";
import { Anchor, Button, Stack, Title, Center } from "@mantine/core";
import { useContext } from "react";
import { useRouter } from 'next/navigation';
import { updateStripeAccount } from "@/actions/stripe";

export default function Dashboard() {

    const { userData } = useContext(DashboardContext)
    const router = useRouter()

    if (userData.defaultShop!) {
        router.push(`/dashboard/${userData.defaultShop}/home`)
    }
    else {
        router.push("/dashboard/0/home")
    }

    return (
        <></>
    )
}
