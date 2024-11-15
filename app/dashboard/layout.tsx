
import { getServerSession } from "next-auth";
import Dashboard from "./Dashboard";
import { ReactNode, useContext } from "react";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/actions/user";
import { DashboardProvider } from "@/context/DashboardContext";
import { isStripeAccountOnboarded } from "@/actions/stripe";
import { MantineProvider, createTheme } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    console.log("dashboard layout function...")
    const session = await getServerSession()
    if (!session) {
        redirect('/login')
    }

    const userData = await getUserByEmail(session.user?.email)
    console.log("userData", userData)
    const isStripeOnboarded = await isStripeAccountOnboarded(userData.stripe.accountId)
    const theme = createTheme({ primaryColor: 'pink' })
    return (
        <MantineProvider theme={theme}>
            <ModalsProvider>
                <DashboardProvider initialUserData={userData} initialIsStripeOnboarded={isStripeOnboarded}>
                    <Dashboard>
                        {children}
                    </Dashboard>
                </DashboardProvider>
            </ModalsProvider>
        </MantineProvider>
    )
}
