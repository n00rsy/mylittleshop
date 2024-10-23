'use client'
import { DashboardContext } from "@/context/DashboardContext"
import { Button, Divider, Input, Text, Group, TextInput, Title, Container, Table, Box, Textarea, Paper, Select, ColorPicker, ColorSwatch, Switch } from "@mantine/core"
import { useContext, useState } from "react"
import { upperFirst, useToggle } from '@mantine/hooks';
import { updateShop } from "@/actions/shop";
import { themes } from "@/models/Shop";

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
    const [isEditingDetails, toggleIsEditingDetails] = useToggle();
    const [isEditingStyle, toggleIsEditingStyle] = useToggle();
    const [isEditingDeployment, toggleIsEditingDeployment] = useToggle();

    const [name, setName] = useState(activeShop.name)
    const [tagline, setTagline] = useState(activeShop.tagline || '')
    const [about, setAbout] = useState(activeShop.about || '')

    const [theme, setTheme] = useState(activeShop.theme)
    const [primaryColor, setPrimaryColor] = useState(activeShop.colors.primary)
    const [secondaryColor, setSecondaryColor] = useState(activeShop.colors.secondary)
    const [accentColor, setAccentColor] = useState(activeShop.colors.accent)

    const [url, setUrl] = useState(activeShop.url)
    const [active, setActive] = useState(activeShop.active)

    const themeOptions = themes.map(theme => ({
        label: upperFirst(theme),
        value: theme
    }))

    const handlesavedetails = async () => {
        console.log("saving....")
        const res = await updateShop(userData._id, { _id: activeShop._id, name: name, tagline: tagline, about: about })
        console.log(res)
        toggleIsEditingDetails()
    }

    const handlesavestyle = async () => {
        console.log("saving style....")

        const colors = {
            primary: primaryColor,
            secondary: secondaryColor,
            accent: accentColor
        }
        console.log({ _id: activeShop._id, theme: theme, colors: colors })
        const res = await updateShop(userData._id, { _id: activeShop._id, theme: theme, colors: colors })
        console.log(res)
        toggleIsEditingStyle()
    }

    const handlesavedeployment = async () => {
        console.log("saving deployment ....")
        console.log( { _id: activeShop._id, url: url, active: active })
        const res = await updateShop(userData._id, { _id: activeShop._id, url: url, active: active })
        console.log(res)
        toggleIsEditingDetails()
    }

    return (
        <Container>
            <Title>Settings</Title>

            <Group justify="flex-start" pb={10}>
                <Title order={4}>Shop Details</Title>
                <Box flex={1}></Box>
                <Button variant="default" onClick={() => toggleIsEditingDetails()} >
                    {isEditingDetails == true ? 'Cancel' : 'Edit'}
                </Button>
                {isEditingDetails == true && (
                    <Button onClick={() => handlesavedetails()}>
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
                                readOnly={!isEditingDetails}
                                variant={isEditingDetails ? 'default' : 'unstyled'}
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
                                readOnly={!isEditingDetails}
                                variant={isEditingDetails ? 'default' : 'unstyled'}
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
                                readOnly={!isEditingDetails}
                                variant={isEditingDetails ? 'default' : 'unstyled'}
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

            <Group justify="flex-start" pb={10}>
                <Title order={4}>Style</Title>
                <Box flex={1}></Box>
                <Button variant="default" onClick={() => toggleIsEditingStyle()} >
                    {isEditingStyle == true ? 'Cancel' : 'Edit'}
                </Button>
                {isEditingStyle == true && (
                    <Button onClick={() => handlesavestyle()}>
                        Save
                    </Button>
                )}
            </Group>
            <Divider />
            <Table>
                <Table.Tbody>
                    <Table.Tr key="theme">
                        <Table.Td><strong>Theme</strong></Table.Td>
                        <Table.Td>
                            <Select
                                data={themeOptions}
                                value={theme}
                                onChange={(_value) => setTheme(_value)}
                                readOnly={!isEditingStyle}
                                variant={isEditingStyle ? 'default' : 'unstyled'}
                                styles={{
                                    input: {
                                        padding: 10
                                    }
                                }}
                            />
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr key="primarycolor">
                        <Table.Td><strong>Primary Color</strong></Table.Td>
                        <Table.Td>
                            {!isEditingStyle ? (
                                <ColorSwatch color={primaryColor} />
                            ) :

                                (
                                    <ColorPicker
                                        value={primaryColor}
                                        onChange={setPrimaryColor}
                                        // readOnly={!isEditingDetails}
                                        variant={isEditingDetails ? 'default' : 'unstyled'}

                                    />
                                )

                            }

                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr key="secondarycolor">
                        <Table.Td><strong>Secondary Color</strong></Table.Td>
                        <Table.Td>
                            {!isEditingStyle ? (
                                <ColorSwatch color={secondaryColor} />
                            ) :

                                (
                                    <ColorPicker
                                        value={secondaryColor}
                                        onChange={setSecondaryColor}
                                        // readOnly={!isEditingDetails}
                                        variant={isEditingDetails ? 'default' : 'unstyled'}

                                    />
                                )
                            }
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr key="accentcolor">
                        <Table.Td><strong>Accent Color</strong></Table.Td>
                        <Table.Td>
                            {!isEditingStyle ? (
                                <ColorSwatch color={accentColor} />
                            ) :

                                (
                                    <ColorPicker
                                        value={accentColor}
                                        onChange={setAccentColor}
                                        // readOnly={!isEditingDetails}
                                        variant={isEditingDetails ? 'default' : 'unstyled'}

                                    />
                                )
                            }
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>

            <Group justify="flex-start" pb={10}>
                <Title order={4}>Deployment</Title>
                <Box flex={1}></Box>
                <Button variant="default" onClick={() => toggleIsEditingDeployment()} >
                    {isEditingDeployment == true ? 'Cancel' : 'Edit'}
                </Button>
                {isEditingDeployment == true && (
                    <Button onClick={() => handlesavedeployment()}>
                        Save
                    </Button>
                )}
            </Group>
            <Divider />
            <Table>
                <Table.Tbody>
                    <Table.Tr key="url">
                        <Table.Td><strong>Url</strong></Table.Td>
                        <Table.Td>
                            <TextInput
                                value={url}
                                onChange={(event) => setUrl(event?.currentTarget.value)}
                                readOnly={!isEditingDeployment}
                                variant={isEditingDeployment ? 'default' : 'unstyled'}
                                styles={{
                                    input: {
                                        padding: 10
                                    }
                                }}
                            />
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr key="active">
                        <Table.Td><strong>Active</strong></Table.Td>
                        <Table.Td>
                            <Switch
                                checked={active}
                                onChange={(event) => setActive(event.currentTarget.checked)}
                                disabled={!isEditingDeployment}
                            />
                        </Table.Td>
                    </Table.Tr>


                </Table.Tbody>
            </Table>

        </Container>
    )
}
