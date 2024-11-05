'use client'
import { useContext, useState } from 'react';
import { Stepper, Button, Group, Center, Title, Container, Stack, Paper, Table, TextInput, Textarea, Select, ColorPicker } from '@mantine/core';
import ProductEditor from '@/components/ProductEditor/ProductEditor';
import { WizardContext } from '@/context/WizardContext';
import { themes, colorSchemes } from "@/models/Shop";
import { upperFirst } from '@mantine/hooks';
import { createShop } from '@/actions/shop';
import { generateColors } from '@mantine/colors-generator';

export default function Wizard() {

    const { userData } = useContext(WizardContext)

    const [stepActive, setStepActive] = useState(1);

    const nextStep = async () => {
        setStepActive((current) => (current < 3 ? current + 1 : current));
        if(stepActive == 3) {
            console.log("FINBISHED")
            console.log(generateColors(primaryColor))

            let shopData = {
                name: name,
                tagline: tagline,
                url: url,
                about: about,
                styles: {
                    theme: theme,
                    primaryColor: primaryColor,
                    colorScheme: colorScheme,
                    mantineColor: generateColors(primaryColor)
                },
                products: []
            }
            console.log("shopdata: ", shopData)
            let createdShop = await createShop(shopData, userData._id)
            console.log("created shop: ", createdShop)
        }
    }
    const prevStep = () => setStepActive((current) => (current > 0 ? current - 1 : current));

    const [name, setName] = useState("")
    const [tagline, setTagline] = useState('')
    const [about, setAbout] = useState('')

    const [theme, setTheme] = useState(null)
    const [primaryColor, setPrimaryColor] = useState('')
    const [colorScheme, setColorScheme] = useState(null)

    const [url, setUrl] = useState('')

    const themeOptions = themes.map(theme => ({
        label: upperFirst(theme),
        value: theme
    }))

    const colorSchemeOptions = colorSchemes.map(colorScheme => ({
        label: upperFirst(colorScheme),
        value: colorScheme
    }))


    return (
        <Stack pt={10}>
            <Container>
                <Title>
                    Create your shop!
                </Title>
            </Container>
            <Container>
                <Title order={4}>
                    sell shoes | blankets | cars | anything
                </Title>
            </Container>
            <Container>
                <Stepper active={stepActive} onStepClick={setStepActive}>
                    <Stepper.Step label="Basic Information" description="What is your shop?">
                        <Paper radius="md" p="xl" withBorder shadow="sm">
                            <Table>
                                <Table.Tbody>
                                    <Table.Tr key="name">
                                        <Table.Td><strong>Name</strong></Table.Td>
                                        <Table.Td>
                                            <TextInput
                                                value={name}
                                                onChange={(event) => setName(event?.currentTarget.value)}
                                            />
                                        </Table.Td>
                                    </Table.Tr>

                                    <Table.Tr key="url">
                                        <Table.Td><strong>Url</strong></Table.Td>
                                        <Table.Td>
                                            <TextInput
                                                value={url}
                                                onChange={(event) => setUrl(event?.currentTarget.value)}
                                            />
                                        </Table.Td>
                                    </Table.Tr>

                                    <Table.Tr key="tagline">
                                        <Table.Td><strong>Tagline</strong></Table.Td>
                                        <Table.Td>
                                            <TextInput
                                                value={tagline}
                                                onChange={(event) => setTagline(event?.currentTarget.value)}
                                            />
                                        </Table.Td>
                                    </Table.Tr>

                                    <Table.Tr key="about">
                                        <Table.Td><strong>About</strong></Table.Td>
                                        <Table.Td>
                                            <Textarea
                                                value={about}
                                                onChange={(event) => setAbout(event?.currentTarget.value)}
                                                autosize
                                                minRows={2}
                                                maxRows={10}
                                            />
                                        </Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
                        </Paper>
                    </Stepper.Step>
                    <Stepper.Step label="Products" description="What are you selling?">
                        <Paper radius="md" p="xl" withBorder shadow="sm">
                            <ProductEditor save={userData == null} u_id={userData._id}></ProductEditor>
                        </Paper>
                    </Stepper.Step>
                    <Stepper.Step label="Styles" description="make it your own!">
                        <Paper radius="md" p="xl" withBorder shadow="sm">
                            <Table>
                                <Table.Tbody>
                                    <Table.Tr key="theme">
                                        <Table.Td><strong>Theme</strong></Table.Td>
                                        <Table.Td>
                                            <Select
                                                data={themeOptions}
                                                value={theme}
                                                onChange={(_value) => setTheme(_value)}
                                                defaultValue='modern'
                                            />
                                        </Table.Td>
                                    </Table.Tr>

                                    <Table.Tr key="primarycolor">
                                        <Table.Td><strong>Primary Color</strong></Table.Td>
                                        <Table.Td>
                                            <ColorPicker
                                                value={primaryColor}
                                                onChange={setPrimaryColor}
                                            />
                                        </Table.Td>
                                    </Table.Tr>

                                    <Table.Tr key="colorscheme">
                                        <Table.Td><strong>Color Scheme</strong></Table.Td>
                                        <Table.Td>
                                            <Select
                                                data={colorSchemeOptions}
                                                value={colorScheme}
                                                onChange={(_value) => setColorScheme(_value)}
                                                defaultValue='light'
                                            />
                                        </Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
                        </Paper>
                    </Stepper.Step>
                    <Stepper.Completed>
                        Review.
                    </Stepper.Completed>
                </Stepper>
            </Container>
            <Group justify="center" mt="xl">
                <Button variant="default" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep}>Next step</Button>
            </Group>
        </Stack>
    );
}
