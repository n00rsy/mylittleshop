'use client';

import { createProduct, createProductWithoutDb, deleteProduct } from '@/actions/product';
import { DragDropContext, Draggable, type DropResult, Droppable } from '@hello-pangea/dnd';
import { ActionIcon, Button, Container, Group, Modal, Text, Stack, Table, TableTd, TextInput, Title, Textarea, NumberInput, rem, Box, Paper, Center, Checkbox, Select, Divider, Radio } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCurrencyDollar, IconEdit, IconEye, IconGripVertical, IconPhoto, IconPlus, IconTrash, IconUpload, IconX } from '@tabler/icons-react';
import { DataTable, DataTableColumn, DataTableDraggableRow } from 'mantine-datatable';
import { ReactNode, useRef, useState } from 'react';
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
    primary?: boolean
}

export default function ProductEditor({ u_id, s_id, p, save }: { u_id?: string, s_id?: string, p?: any, save: boolean }) {
    const [products, setProducts] = useState<any[]>(p || []);
    const [orderChanged, setOrderChanged] = useState(false)
    const [createModalOpened, { open, close }] = useDisclosure(false);
    const [urlEdited, setUrlEdited] = useState(false)
    const [images, setImages] = useState<string[]>([])

    const [useVariations, setUseVariations] = useState(false)
    const [useInventory, setUseInventory] = useState(false)
    const [useShipping, setUseShipping] = useState(false)

    const [variations, setVariations] = useState<any[]>(p || []);
    const [variationName, setVariationName] = useState<any[]>(p || []);
    const [variationOptionName, setVariationOptionName] = useState("")
    const [variationOptionPrice, setVariationOptionPrice] = useState(0)
    const [variationOptionQuantity, setVariationOptionQuantity] = useState(0)

    const [variationOptionPrimary, setVariationOptionPrimary] = useState('')
    const [variationOptionPrices, setVariationOptionPrices] = useState<any>({})
    const [variationOptionQuantities, setVariationOptionQuantities] = useState<any>({})

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [url, setUrl] = useState('')
    const [errors, setErrors] = useState({})

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

    const resetInputs = () => {

    }

    const handlecreateproduct = async (values: any) => {
        // validations here
        let productData = {
            name: name,
            description: description,
            url: url,
            images: images
        }

        if (useVariations) {
            (productData as any).variations = [
                {
                    name: variationName,
                    variationOptions: variations.map(variation => ({
                        name: variation.name,
                        price: variationOptionPrices[variation.name],
                        quantity: 100,
                        primary: variation.name == variationOptionPrimary
                    }))
                }
            ]
        }
        else {
            (productData as any).variations = [{
                name: 'standard',
                variationOptions: [{
                    name: 'standard',
                    quantity: quantity,
                    price: price,
                    primary: true,
                    active: true
                }
                ]
            }]
        }

        console.log("product data: ", productData)

        const createdProduct = (save) ? await createProduct(productData, s_id, u_id) : await createProductWithoutDb(values)

        const items = Array.from(products);
        items.push(createdProduct)
        setProducts(items)

        close()

    }

    const handledeleteproduct = async (product: any) => {
        if (save) await deleteProduct(product._id, s_id, u_id)
        const items = Array.from(products);
        const newItems = items.filter(i => i._id != product._id)
        setProducts(newItems)
    }

    const handleAddVariationOption = async (values: any) => {
        console.log("handle create got: ", values)

        const createdVariation = {
            _id: window.crypto.randomUUID(),
            name: variationOptionName,
            price: price,
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

    const handleDeleteVariationOption = async (product: any) => {
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

    const handleUploadImages = async (files: File[]) => {
        console.log(files)
        for(const file of files) {
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream'
                },
                body: await file.arrayBuffer()
            })
            const result = await response.json()
            console.log(result)
            if (result.success) {
                const newImages = [...images]
                newImages.push(result.path)
                setImages(newImages)
                console.log(images)
            }
            else {
                // error alert
            }
        }
    }

    const handlenamechange = (value: string) => {
        setName(value)
        if (!urlEdited) {
            setUrl(urlstrip(value))
        }
    }

    const handleurlchange = (value: string) => {
        setUrlEdited(true)
        setUrl(urlstrip(value))
    }

    const urlstrip = (input: string) => {
        return input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    }

    const handleVariationOptionPriceChange = (variationOptionName: string, newPrice: number) => {
        const newVariationOptionPrices = { ...variationOptionPrices }
        newVariationOptionPrices[variationOptionName] = newPrice
        setVariationOptionPrices(newVariationOptionPrices)
    }

    const handleVariationOptionQuantityChange = (variationOptionName: string, newQuantity: number) => {
        const newVariationOptionQuantities = { ...variationOptionQuantities }
        newVariationOptionQuantities[variationOptionName] = newQuantity
        setVariationOptionQuantities(newVariationOptionQuantities)
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
        {
            accessor: 'price',
            render: (variation) =>
            (
                <NumberInput
                    value={variationOptionPrices[variation.name]}
                    onChange={(value) => handleVariationOptionPriceChange(variation.name, Number(value))}
                />
            )
        },
        {
            accessor: 'primary',
            render: (variation) => {
                return (
                    <Radio value={variation.name} label={variation.name} />
                )
            }
        },
        {
            accessor: 'delete',
            width: 100,
            textAlign: 'center',
            render: (variation) => (
                <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="red"
                    onClick={() => handleDeleteVariationOption(variation)}
                >
                    <IconTrash size={16} />
                </ActionIcon>
            ),
        },
    ];

    if (useInventory) {
        variationColumns.splice(3, 0, {
            accessor: 'quantity',
            render: (variation) =>
            (
                <NumberInput
                    value={variationOptionQuantities[variation.name]}
                    onChange={(value) => handleVariationOptionQuantityChange(variation.name, Number(value))}
                />
            )
        })
    }

    return (
        <>
            <Modal opened={createModalOpened} onClose={close} title="Add Product">
                <Stack>
                    <TextInput
                        required
                        label="Product Name"
                        placeholder="Chocolate Chip Brownies"
                        value={name}
                        onChange={(event) => handlenamechange(event.currentTarget.value)}
                        error={errors.name && 'Invalid name.'}
                        radius="md"
                    />
                    <TextInput
                        required
                        label="Product Url"
                        placeholder="chocolatechipbrownies"
                        value={url}
                        onChange={(event) => handleurlchange(event.currentTarget.value)}
                        error={errors.name && 'Invalid url path.'}
                        radius="md"
                    />
                    <Textarea
                        required
                        label="Description"
                        placeholder="Premium brownies made fresh daily."
                        value={description}
                        onChange={(event) => setDescription(event.currentTarget.value)}
                        error={errors.password && 'Invalid description.'}
                        radius="md"
                    />

                    <Dropzone
                        onDrop={(files) => handleUploadImages(files)}
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
                            <Radio.Group
                                value={variationOptionPrimary}
                                onChange={setVariationOptionPrimary}
                            >
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
                            </Radio.Group>
                            <Title order={3}>Add Variation</Title>
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
                            {useInventory && (
                                <NumberInput
                                    label="Stock"
                                    value={variationOptionQuantity}
                                    description="How many do you have?"
                                    onChange={(value) => setVariationOptionQuantity(Number(value))}
                                    placeholder="100"
                                />
                            )
                            }
                            <Button onClick={handleAddVariationOption}>Add Variation</Button>
                        </Box>
                    ) : (
                        <Box>
                            <NumberInput
                                required
                                leftSection={(<IconCurrencyDollar style={{ width: rem(16), height: rem(16) }} />)}
                                label="Price"
                                value={price}
                                onChange={(event) => setPrice(Number(event))}
                                placeholder="9.99"
                            />
                            {useInventory && (
                                <NumberInput
                                    label="Stock"
                                    value={quantity}
                                    description="How many do you have?"
                                    onChange={(event) => setQuantity(Number(event))}
                                    placeholder="100"
                                />
                            )}
                        </Box>
                    )}
                </Stack>
                <Group justify="space-between" mt="xl">
                    <Button onClick={handlecreateproduct} fullWidth mt="xl">
                        Add
                    </Button>
                </Group>

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
