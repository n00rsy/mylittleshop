
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

    const newUserData = await getUserByEmail(session.user?.email)
    console.log("newUserData", newUserData)
    // const { setUserData } = useContext(DashboardContext)
    // setUserData(newUserData)
    return (
        <DashboardProvider>
            <DashboardAppShellLayout userData={newUserData}>
                {children}
            </DashboardAppShellLayout>
        </DashboardProvider>
    )
}
