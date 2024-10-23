
import { getServerSession } from "next-auth";
import DashboardAppShellLayout from "./AppShellLayout";
import { ReactNode, useContext } from "react";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/actions/user";
import { DashboardProvider } from "@/context/DashboardContext";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    console.log("dashboard layout function...")
    const session = await getServerSession()
    if (!session) {
        redirect('/login')
    }

    const userData = await getUserByEmail(session.user?.email)
    // TODO: GET STRIPE ACCOUNT INFO
    // TODO: default shop
    console.log("newUserData", userData)

    return (
        <DashboardProvider>
            <DashboardAppShellLayout userData={userData}>
                {children}
            </DashboardAppShellLayout>
        </DashboardProvider>
    )
}
