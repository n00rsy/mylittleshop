
import { getServerSession } from "next-auth";
import DashboardAppShellLayout from "./AppShellLayout";
import { ReactNode, useContext } from "react";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/actions/user";
import { DashboardProvider } from "@/context/DashboardContext";
import { getStripeAccount } from "@/actions/stripe";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    console.log("dashboard layout function...")
    const session = await getServerSession()
    if (!session) {
        redirect('/login')
    }

    const userData = await getUserByEmail(session.user?.email)
    console.log("userData", userData)
    let stripeData = undefined
    if (userData!.stripe) {
        console.log("Getting stripe data...")
        stripeData = await getStripeAccount(userData.stripe.accountId)
        console.log("stripeData:", stripeData)
    }

    return (
        <DashboardProvider>
            <DashboardAppShellLayout userData={userData} stripeData={stripeData}>
                {children}
            </DashboardAppShellLayout>
        </DashboardProvider>
    )
}
