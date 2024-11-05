import { getShopByUrl } from "@/actions/shop";
import { Badge, Button, Card, Grid, Group, Image, MantineProvider, Text, Title } from "@mantine/core";
import WizardLayout from "./WizardLayout";
import { getUserByEmail } from "@/actions/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"
import { WizardProvider } from "@/context/WizardContext";


export default async function Wizard({ children }: { children: any }) {

    const session = await getServerSession()

    let userData = null
    if (session) {
        userData = await getUserByEmail(session.user?.email)
    }
    else {
        redirect('/login')
    }


    return (
        <MantineProvider>
            <WizardProvider initialUserData={userData}>
                {children}
            </WizardProvider>
        </MantineProvider>
    )
}
