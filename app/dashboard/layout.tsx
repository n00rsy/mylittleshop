
import { getServerSession } from "next-auth";
import Dashboard from "./Dashboard";
import { ReactNode, useContext } from "react";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/actions/user";
import { DashboardProvider } from "@/context/DashboardContext";
import { getStripeAccount, isStripeAccountOnboarded } from "@/actions/stripe";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    console.log("dashboard layout function...")
    const session = await getServerSession()
    if (!session) {
        redirect('/login')
    }

    const userData = await getUserByEmail(session.user?.email)
    console.log("userData", userData)
    const isStripeOnboarded = isStripeAccountOnboarded(userData.stripe.accountId)
    return (
        <DashboardProvider>
            <Dashboard userData={userData} isStripeOnboarded={isStripeOnboarded}>
                {children}
            </Dashboard>
        </DashboardProvider>
    )
}
