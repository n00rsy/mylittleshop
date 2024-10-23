"use client";
import { IconBuildingStore, IconChevronDown, IconHome2, IconLogout, IconPlus, IconSettings } from '@tabler/icons-react';
import { Text, Stack, AppShell, Flex, Title, Burger, Group, Center, NavLink, Loader, Button, Container, Box, Avatar, Menu, rem, Anchor, JsonInput } from '@mantine/core';
import { useContext } from 'react';
import { DashboardContext } from '@/context/DashboardContext';
import { createStripeAccount, getStripeAccount, onboardStripeAccount, updateStripeAccount } from '@/actions/stripe';
import { useRouter } from 'next/navigation';

export default function Home() {
    const { userData, setUserData, activeShopIndex } = useContext(DashboardContext)
    const activeShop = userData.shops[activeShopIndex]
    const router = useRouter()
    const handleeditstripe = async () => {
        console.log("requesting edit stripe...")
        const accountLink = await updateStripeAccount(userData.stripe.accountId)
        console.log(accountLink)
        if (accountLink) {
            router.push(accountLink)
        }
    }

    const handlcreatestripe = async () => {
        console.log("requesting add stripe...")
        const accountLink = await createStripeAccount(userData)
        console.log(accountLink)
        if (accountLink) {
            router.push(accountLink)
        }
    }

    const handlefinshstripe = async () => {
        console.log("requesting finish stripe...")
        const accountLink = await onboardStripeAccount(userData.stripe.accountId)
        console.log(accountLink)
        router.push(accountLink)
    }

    return (
        <Center style={{ height: '50vh' }}>
            <Container>
                <Stack>
                    <Button component="a" href={`/shop/${activeShop.url}`}>View your Shop</Button>

                    {(userData!.stripe!) ?

                        ((userData!.stripe.isOnboarded) ?
                            (<Button onClick={handleeditstripe}>Edit Stripe Details</Button>) :
                            (<Button onClick={handlefinshstripe}>Finish Stripe Details</Button>)) :

                        (<Button onClick={handlcreatestripe}>Create Stripe Details</Button>)

                    }


                </Stack>
            </Container>
        </Center>
    );
}
