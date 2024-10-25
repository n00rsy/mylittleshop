'use client'

import { DashboardContext } from "@/context/DashboardContext";
import { Container, Divider, Title } from "@mantine/core";
import { ConnectAccountManagement, ConnectAccountOnboarding } from "@stripe/react-connect-js";
import { useContext } from "react";


export default function UserSettings() {

    const { userData, setIsStripeOnboarded, isStripeOnboarded } = useContext(DashboardContext)

    const testing = () => {
        console.log("testing")
        // fetch stripe data and check if onboarded
    }

    return (
        <Container fluid>
            <Title>User Settings</Title>
            {isStripeOnboarded ?
                (<ConnectAccountManagement />) :
                (<ConnectAccountOnboarding onExit={testing} />)
            }
        </Container>
    )
}
