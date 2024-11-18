'use client'
import { DashboardContext } from "@/context/DashboardContext"
import { Button, Divider, Input, Text, Group, TextInput, Title, Container, Table, Box, Textarea, Paper, Select, ColorPicker, ColorSwatch, Switch } from "@mantine/core"
import { useContext, useState } from "react"
import { upperFirst, useToggle } from '@mantine/hooks';
import { updateShop } from "@/actions/shop";
import { themes, colorSchemes } from "@/models/Shop";
import { generateColors } from '@mantine/colors-generator';

export default function Settings() {
    const { userData, activeShopIndex } = useContext(DashboardContext)
    const activeShop = userData.shops[activeShopIndex]

    const [isEditingDetails, toggleIsEditingDetails] = useToggle();
    const [isEditingStyle, toggleIsEditingStyle] = useToggle();
    const [isEditingDeployment, toggleIsEditingDeployment] = useToggle();
    const [isEditingContact, toggleIsEditingContact] = useToggle();

    const [name, setName] = useState(activeShop.name)
    const [tagline, setTagline] = useState(activeShop.tagline || '')
    const [about, setAbout] = useState(activeShop.about || '')

    const [theme, setTheme] = useState(activeShop.styles.theme)
    const [primaryColor, setPrimaryColor] = useState(activeShop.styles.primaryColor)
    const [colorScheme, setColorScheme] = useState(activeShop.styles.colorScheme)

    const [url, setUrl] = useState(activeShop.url)
    const [active, setActive] = useState(activeShop.active)

    const themeOptions = themes.map(theme => ({
        label: upperFirst(theme),
        value: theme
    }))

    const colorSchemeOptions = colorSchemes.map(colorScheme => ({
        label: upperFirst(colorScheme),
        value: colorScheme
    }))

    const handlesavedetails = async () => {
        console.log("saving....")
        const res = await updateShop(userData._id, { _id: activeShop._id, name: name, tagline: tagline, about: about })
        console.log(res)
        toggleIsEditingDetails()
    }

    const handlesavestyle = async () => {
        console.log("saving style....")

        const styles = {
            theme: theme,
            colorScheme: colorScheme,
            primaryColor: primaryColor,
            mantineColor: generateColors(primaryColor)
        }

        console.log({ _id: activeShop._id, styles: styles })
        const res = await updateShop(userData._id, { _id: activeShop._id, styles: styles })
        console.log(res)
        toggleIsEditingStyle()
    }

    const handlesavedeployment = async () => {
        console.log("saving deployment ....")
        console.log({ _id: activeShop._id, url: url, active: active })
        const res = await updateShop(userData._id, { _id: activeShop._id, url: url, active: active })
        console.log(res)
        toggleIsEditingDetails()
    }

    const handlesavecontact = async () => {
        console.log("saving contac....")
        console.log({ _id: activeShop._id, url: url, active: active })
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

                    <Table.Tr key="colorScheme">
                        <Table.Td><strong>Color Scheme</strong></Table.Td>
                        <Table.Td>
                            <Select
                                data={colorSchemeOptions}
                                value={colorScheme}
                                onChange={(_value) => setColorScheme(_value)}
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
                </Table.Tbody>
            </Table>

            <Group justify="flex-start" pb={10}>
                <Title order={4}>Public Links and Contact</Title>
                <Box flex={1}></Box>
                <Button variant="default" onClick={() => toggleIsEditingContact()} >
                    {isEditingContact == true ? 'Cancel' : 'Edit'}
                </Button>
                {isEditingContact == true && (
                    <Button onClick={() => handlesavecontact()}>
                        Save
                    </Button>
                )}
            </Group>
            <Divider />

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

            <Group justify="flex-start" pb={10}>
                <Title order={4}>Danger Zone</Title>
                <Box flex={1}></Box>
            </Group>
            <Divider />
            <Button color="red">Delete Shop</Button>

        </Container>
    )
}
