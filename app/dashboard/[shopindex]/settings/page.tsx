'use client'
import { DashboardContext } from "@/context/DashboardContext"
import { Button, Divider, Input, Text, Group, TextInput, Title, Container, Table, Box, Textarea, Paper } from "@mantine/core"
import { useContext, useState } from "react"
import { useToggle } from '@mantine/hooks';
import { updateShop } from "@/actions/shop";

export default function Settings() {
    const { userData, setUserData, activeShopIndex } = useContext(DashboardContext)
    const activeShop = userData.shops[activeShopIndex]
    // const { name, theme, colors } = userData.shops[activeShopIndex]
    // const short_description = "this is my shop that sells books. please buy them"
    // const about = "Welcome to homemade. What does homemade mean to you? Is it something you cook or make for your family or the time with family or smells that build the memories? When I started this homemade baking business in April of 2012, it was with the idea that everything would be made from scratch.  Mainly because of my own memories in the kitchen of cooking with my family. Coming from a big family, everything was made from scratch so never in a million years did I imagined how much fun I was going to have baking for my community.  When I say baked from scratch, I mean that I use basic ingredients from start to finish. I make buttercream frosting with real butter and our custom cakes, cinnamon rolls, and cookies made completely from scratch with farm-fresh local eggs and real butter. If you have questions about any ingredient please feel free to ask. "

    // const properties = {
    //     "Visual": [
    //         {
    //             "name": "Theme",
    //             "document_mapping": "theme",
    //             "initial_value": theme
    //         },
    //         {
    //             "name": "Primary Color",
    //             "document_mapping": "colors.primary_color",
    //             "initial_value": colors.primary_color
    //         },
    //         {
    //             "name": "Secondary",
    //             "document_mapping": "theme",
    //             "initial_value": colors.primary
    //         },
    //         {
    //             "name": "theme",
    //             "document_mapping": "theme",
    //             "initial_value": colors.primary_color
    //         }
    //     ]
    // }
    const [isEditing, toggle] = useToggle();

    const [name, setName] = useState(activeShop.name)
    const [tagline, setTagline] = useState(activeShop.tagline || '')
    const [about, setAbout] = useState(activeShop.about || '')

    const handlesave = async () => {
        console.log("saving....")
        const res = await updateShop(userData._id, { _id: activeShop._id, name: name, tagline: tagline, about: about })
        console.log(res)
        toggle()
    }

    return (
        <Container>
            <Title>Settings</Title>
            <Paper radius="md" p="xl" withBorder shadow="sm">
            <Group justify="flex-start" pb={10}>
                <Title order={4}>Shop Details</Title>
                <Box flex={1}></Box>
                <Button variant="default" onClick={() => toggle()} >
                    {isEditing == true ? 'Cancel' : 'Edit'}
                </Button>
                {isEditing == true && (
                    <Button onClick={() => handlesave()}>
                        Save
                    </Button>
                )}
            </Group>
            <Divider />
            <Table>
                <Table.Tbody>
                    <Table.Tr key="name">
                        <Table.Td><strong>Name</strong></Table.Td>
                        <Table.Td>
                            <TextInput
                                value={name}
                                onChange={(event) => setName(event?.currentTarget.value)}
                                readOnly={!isEditing}
                                variant={isEditing ? 'default' : 'unstyled'}
                                styles={{
                                    input: {
                                        padding: 10
                                    }
                                }}
                            />
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr key="tagline">
                        <Table.Td><strong>Tagline</strong></Table.Td>
                        <Table.Td>
                            <TextInput
                                value={tagline}
                                onChange={(event) => setTagline(event?.currentTarget.value)}
                                readOnly={!isEditing}
                                variant={isEditing ? 'default' : 'unstyled'}
                                styles={{
                                    input: {
                                        padding: 10
                                    }
                                }}
                            />
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr key="about">
                        <Table.Td><strong>About</strong></Table.Td>
                        <Table.Td>
                            <Textarea
                                value={about}
                                onChange={(event) => setAbout(event?.currentTarget.value)}
                                readOnly={!isEditing}
                                variant={isEditing ? 'default' : 'unstyled'}
                                styles={{
                                    input: {
                                        padding: 10
                                    }
                                }}
                                autosize
                                minRows={2}
                                maxRows={10}
                            />
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
            </Paper>
        </Container>
    )
}
