'use client';

import { createProduct, createProductWithoutDb, deleteProduct } from '@/actions/product';
import { DragDropContext, Draggable, type DropResult, Droppable } from '@hello-pangea/dnd';
import { ActionIcon, Button, Container, Group, Modal, Text, Stack, Table, TableTd, TextInput, Title, Textarea, NumberInput, rem, Box, Paper, Center, Checkbox, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCurrencyDollar, IconEdit, IconEye, IconGripVertical, IconPhoto, IconPlus, IconTrash, IconUpload, IconX } from '@tabler/icons-react';
import { DataTable, DataTableColumn, DataTableDraggableRow } from 'mantine-datatable';
import { useState } from 'react';
import { modals } from '@mantine/modals';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

interface ProductRecordData {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

interface VariationRecordData {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}

export default function ProductEditor({ u_id, s_id, p, save }: { u_id?: string, s_id?: string, p?: any, save: boolean }) {
    const [products, setProducts] = useState<any[]>(p || []);
    const [orderChanged, setOrderChanged] = useState(false)
    const [createModalOpened, { open, close }] = useDisclosure(false);
    const [urlEdited, setUrlEdited] = useState(false)

    const [useVariations, setUseVariations] = useState(false)
    const [useInventory, setUseInventory] = useState(false)
    const [useShipping, setUseShipping] = useState(false)

    const [variations, setVariations] = useState<any[]>(p || []);
    const [variationName, setVariationName] = useState<any[]>(p || []);
    const [variationOptionName, setVariationOptionName] = useState("")
    const [variationOptionPrice, setVariationOptionPrice] = useState(0)
    const [variationOptionQuantity, setVariationOptionQuantity] = useState(0)

    const variationsPresets = [
        {
            name: "Size",
            variations: [
                "Small", "Medium", "Large", "X-Large"
            ]
        },
        {
            name: "Color",
            variations: [
                "Red", "Green", "Blue"
            ]
        },
        {
            name: "Quantity",
            variations: [
                "1 pack", "3 pack", "6 pack", "12 pack"
            ]
        },
    ]

    const variationPresetOptions = variationsPresets.map(preset => ({
        value: preset.name,
        label: preset.name
    }))

    // TODO: add collapse w advanced settings: quanitity limit, https://mantine.dev/core/collapse/#usage
    // product options: size, color, custom
    // image uploads
    const form = useForm({
        initialValues: {
            name: '',
            urlName: '',
            description: '',
            price: 0,
            quantity: 0
        },
    });

    const handlecreateproduct = async (values: any) => {
        console.log("handle create got: ", values)
        const createdProduct = (save) ? await createProduct(values, s_id, u_id) : await createProductWithoutDb(values)

        const items = Array.from(products);
        items.push(createdProduct)
        setProducts(items)

        close()
        form.reset();
    }

    const handledeleteproduct = async (product: any) => {
        if (save) await deleteProduct(product._id, s_id, u_id)
        const items = Array.from(products);
        const newItems = items.filter(i => i._id != product._id)
        setProducts(newItems)
    }

    const handleAddVariation = async (values: any) => {
        console.log("handle create got: ", values)

        const createdVariation = {
            _id: window.crypto.randomUUID(),
            name: variationOptionName,
            price: variationOptionPrice,
            quantity: variationOptionQuantity
        }

        console.log(createdVariation)
        const items = Array.from(variations);
        items.push(createdVariation)
        setVariations(items)
        // reset inputs
        setVariationOptionName("")
        setVariationOptionPrice(0)
        setVariationOptionQuantity(0)
    }

    const handleDeleteVariation = async (product: any) => {
        const items = Array.from(variations);
        const newItems = items.filter(i => i._id != product._id)
        setVariations(newItems)
    }

    const useVariationPreset = (_value: any) => {
        console.log(_value)
        const variationsPreset = variationsPresets.find(vp => vp.name == _value)
        const createdVariations = variationsPreset.variations.map(v => ({
            _id: window.crypto.randomUUID(),
            name: v,
            price: variationOptionPrice,
            quantity: variationOptionQuantity
        }))
        setVariations(createdVariations)
        setVariationName(variationsPreset.name)
    }

    const handleProductDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(products);
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        const [reorderedItem] = items.splice(sourceIndex, 1);
        items.splice(destinationIndex, 0, reorderedItem);

        setProducts(items);
        setOrderChanged(true)
        console.log({
            title: 'Table reordered',
            message: `The product named "${items[sourceIndex].name}" has been moved from position ${sourceIndex + 1} to ${destinationIndex + 1}.`,
            color: 'blue',
        });
    };

    const handleVariationDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(variations);
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        const [reorderedItem] = items.splice(sourceIndex, 1);
        items.splice(destinationIndex, 0, reorderedItem);

        setVariations(items);
        console.log({
            title: 'Variation Table reordered',
            message: `The variation named "${items[sourceIndex].name}" has been moved from position ${sourceIndex + 1} to ${destinationIndex + 1}.`,
            color: 'blue',
        });
    };

    const handlenamechange = (value: string) => {
        form.setFieldValue('name', value)
        if (!urlEdited) {
            form.setFieldValue('urlName', urlstrip(value))
        }
    }

    const handleurlnamechange = (value: string) => {
        setUrlEdited(true)
        form.setFieldValue('urlName', urlstrip(value))
    }

    const urlstrip = (input: string) => {
        return input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    }

    const confirmDeleteModal = (product: any) =>
        modals.openConfirmModal({
            title: 'Confirm Delete',
            children: (
                <Text size="sm">
                    Are you sure you want to delete this product?
                </Text>
            ),
            confirmProps: { color: 'red' },
            labels: { confirm: 'Delete', cancel: 'Cancel' },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => handledeleteproduct(product),
        })

    const productColumns: DataTableColumn<ProductRecordData>[] = [
        // add empty header column for the drag handle
        { accessor: '', hiddenContent: true, width: 30 },
        { accessor: 'name', },
        { accessor: 'price', },
        { accessor: 'quantity' },
        {
            accessor: 'actions',
            width: 100,
            textAlign: 'center',
            render: (product) => (
                <Group gap={4} justify="center" wrap="nowrap">
                    <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="green"
                        onClick={() => console.log({ product, action: 'view' })}
                    >
                        <IconEye size={16} />
                    </ActionIcon>
                    <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="blue"
                        onClick={() => console.log({ product, action: 'edit' })}
                    >
                        <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="red"
                        onClick={() => confirmDeleteModal(product)}
                    >
                        <IconTrash size={16} />
                    </ActionIcon>
                </Group>
            ),
        },
    ];

    let variationColumns: DataTableColumn<VariationRecordData>[] = [
        // add empty header column for the drag handle
        { accessor: '', hiddenContent: true, width: 30 },
        { accessor: 'name', },
        { accessor: 'price', },
        {
            accessor: 'delete',
            width: 100,
            textAlign: 'center',
            render: (variation) => (
                <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="red"
                    onClick={() => handleDeleteVariation(variation)}
                >
                    <IconTrash size={16} />
                </ActionIcon>
            ),
        },
    ];

    if (useInventory) {
        variationColumns.splice(3, 0, { accessor: 'quantity' })
    }

    return (
        <>
            <Modal opened={createModalOpened} onClose={close} title="Add Product">
                <form onSubmit={form.onSubmit((values) => handlecreateproduct(values))}>
                    <Stack>
                        <TextInput
                            required
                            label="Product Name"
                            placeholder="Chocolate Chip Brownies"
                            value={form.values.name}
                            onChange={(event) => handlenamechange(event.currentTarget.value)}
                            error={form.errors.name && 'Invalid name.'}
                            radius="md"
                        />
                        <TextInput
                            required
                            label="Product Url"
                            placeholder="chocolatechipbrownies"
                            value={form.values.urlName}
                            onChange={(event) => handleurlnamechange(event.currentTarget.value)}
                            error={form.errors.name && 'Invalid url path.'}
                            radius="md"
                        />
                        <Textarea
                            required
                            label="Description"
                            placeholder="Premium brownies made fresh daily."
                            value={form.values.description}
                            onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
                            error={form.errors.password && 'Invalid description.'}
                            radius="md"
                        />

                        <Dropzone
                            onDrop={(files) => console.log('accepted files', files)}
                            onReject={(files) => console.log('rejected files', files)}
                            maxSize={5 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                        >
                            <Group justify="center" gap="xl" mih={100} style={{ pointerEvents: 'none' }}>
                                <Dropzone.Accept>
                                    <IconUpload
                                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                                        stroke={1.5}
                                    />
                                </Dropzone.Accept>
                                <Dropzone.Reject>
                                    <IconX
                                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                                        stroke={1.5}
                                    />
                                </Dropzone.Reject>
                                <Dropzone.Idle>
                                    <IconPhoto
                                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                                        stroke={1.5}
                                    />
                                </Dropzone.Idle>

                                <Center ta="center">
                                    <Stack>
                                        <Text size="xl" inline>
                                            Add Product Images here
                                        </Text>
                                        <Text size="sm" c="dimmed" inline mt={7}>
                                            Attach as many files as you like, each file should not exceed 5mb
                                        </Text>
                                    </Stack>
                                </Center>
                            </Group>
                        </Dropzone>

                        <Checkbox
                            checked={useVariations}
                            onChange={(event) => setUseVariations(event.currentTarget.checked)}
                            label="Variations"
                            description="Does your product have sizing or color options?"
                        />

                        <Checkbox
                            checked={useInventory}
                            onChange={(event) => setUseInventory(event.currentTarget.checked)}
                            label="Track Inventory"
                            description="Do you need to track product inventory?"
                        />

                        <Checkbox
                            checked={useShipping}
                            onChange={(event) => setUseShipping(event.currentTarget.checked)}
                            label="Shipping"
                            description="Do you need to generate shipping labels?"
                        />

                        {useVariations ? (
                            <Box>
                                <Select
                                data={variationPresetOptions}
                                label="Variation preset"
                                onChange={(_value) => useVariationPreset(_value)}
                                />
                                <TextInput

                                label="Variation name"
                                value={variationName}
                                onChange={(event) => setVariationName(event?.currentTarget.value)} />
                                <DragDropContext onDragEnd={handleVariationDragEnd}>
                                    <DataTable<VariationRecordData>
                                        columns={variationColumns}
                                        records={variations}
                                        minHeight={150}
                                        noRecordsText="No Variations"
                                        striped
                                        tableWrapper={({ children }) => (
                                            <Droppable droppableId="datatable">
                                                {(provided) => (
                                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                                        {children}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        )}
                                        styles={{ table: { tableLayout: 'fixed' } }}
                                        rowFactory={({ record, index, rowProps, children }) => (
                                            <Draggable key={record._id} draggableId={record._id} index={index}>
                                                {(provided, snapshot) => (
                                                    <DataTableDraggableRow isDragging={snapshot.isDragging} {...rowProps} {...provided.draggableProps}>
                                                        {/** custom drag handle */}
                                                        <TableTd {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            <IconGripVertical size={16} />
                                                        </TableTd>
                                                        {children}
                                                    </DataTableDraggableRow>
                                                )}
                                            </Draggable>
                                        )}
                                    />
                                </DragDropContext>

                                <TextInput label="Name"
                                    value={variationOptionName}
                                    onChange={(event) => setVariationOptionName(event?.currentTarget.value)} />
                                <NumberInput
                                    required
                                    leftSection={(<IconCurrencyDollar style={{ width: rem(16), height: rem(16) }} />)}
                                    label="Price"
                                    value={variationOptionPrice}
                                    onChange={(value) => setVariationOptionPrice(Number(value))}
                                    placeholder="9.99"
                                />
                                <NumberInput
                                    label="Quantity"
                                    value={variationOptionQuantity}
                                    description="How many do you have?"
                                    onChange={(value) => setVariationOptionQuantity(Number(value))}
                                    placeholder="100"
                                />
                                <Button onClick={handleAddVariation}>Add Variation</Button>
                            </Box>
                        ) : (
                            <Box>
                                <NumberInput
                                    required
                                    leftSection={(<IconCurrencyDollar style={{ width: rem(16), height: rem(16) }} />)}
                                    label="Price"
                                    value={form.values.price}
                                    onChange={(event) => form.setFieldValue('price', Number(event))}
                                    placeholder="9.99"
                                />
                                {useInventory && (
                                    <NumberInput
                                        label="Quantity"
                                        value={form.values.quantity}
                                        description="How many do you have?"
                                        onChange={(event) => form.setFieldValue('quantity', Number(event))}
                                        placeholder="100"
                                    />
                                )}
                            </Box>
                        )}
                    </Stack>
                    <Group justify="space-between" mt="xl">
                        <Button type="submit" fullWidth mt="xl">
                            Add
                        </Button>
                    </Group>
                </form>
            </Modal>
            <DragDropContext onDragEnd={handleProductDragEnd}>
                <DataTable<ProductRecordData>
                    columns={productColumns}
                    records={products}
                    minHeight={150}
                    noRecordsText="No Products"
                    striped
                    tableWrapper={({ children }) => (
                        <Droppable droppableId="datatable">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {children}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    )}
                    styles={{ table: { tableLayout: 'fixed' } }}
                    rowFactory={({ record, index, rowProps, children }) => (
                        <Draggable key={record._id} draggableId={record._id} index={index}>
                            {(provided, snapshot) => (
                                <DataTableDraggableRow isDragging={snapshot.isDragging} {...rowProps} {...provided.draggableProps}>
                                    {/** custom drag handle */}
                                    <TableTd {...provided.dragHandleProps} ref={provided.innerRef}>
                                        <IconGripVertical size={16} />
                                    </TableTd>
                                    {children}
                                </DataTableDraggableRow>
                            )}
                        </Draggable>
                    )}
                />
            </DragDropContext>
            <Button onClick={open}><IconPlus size="1rem" style={{ marginRight: 10 }} /> Add Product</Button>
            {orderChanged && (
                <Button>Save Reording</Button>
            )}
        </>
    );
}
