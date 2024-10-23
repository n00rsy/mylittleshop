import { getShopByUrl } from "@/actions/shop";
import { Badge, Button, Card, Grid, Group, Image, Text, Title } from "@mantine/core";
import WizardLayout from "./WizardLayout";
import { getUserByEmail } from "@/actions/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";


export default async function Wizard() {

    const session = await getServerSession()
    let userData = undefined
    if (session) {
        userData = await getUserByEmail(session.user?.email)
    }


    return (
        <WizardLayout userData={userData}
        />
    )
}
