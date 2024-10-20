'use client'
import { useState } from 'react';
import { Stepper, Button, Group, Center, Title, Container, Stack, Paper, Table, TextInput, Textarea } from '@mantine/core';
import ProductEditor from '@/components/ProductEditor/ProductEditor';

export default function Wizard() {
    const [active, setActive] = useState(1);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

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
                <Stepper active={active} onStepClick={setActive}>
                    <Stepper.Step label="Basic Information" description="What is your shop?">
                        <Paper radius="md" p="xl" withBorder shadow="sm">
                            <Table>
                                <Table.Tbody>
                                    <Table.Tr key="name">
                                        <Table.Td><strong>Name</strong></Table.Td>
                                        <Table.Td>
                                            <TextInput

                                            />
                                        </Table.Td>
                                    </Table.Tr>

                                    <Table.Tr key="tagline">
                                        <Table.Td><strong>Tagline</strong></Table.Td>
                                        <Table.Td>
                                            <TextInput

                                            />
                                        </Table.Td>
                                    </Table.Tr>

                                    <Table.Tr key="about">
                                        <Table.Td><strong>About</strong></Table.Td>
                                        <Table.Td>
                                            <Textarea

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
                    <ProductEditor save={false}></ProductEditor>
                    </Paper>
                    </Stepper.Step>
                    <Stepper.Step label="Theme" description="make it your own!">
                        Step 3 content: Get full access
                    </Stepper.Step>
                    <Stepper.Completed>
                        Completed, click back button to get to previous step
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
