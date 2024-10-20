'use client';

import { createProduct, createProductWithoutDb, deleteProduct } from '@/actions/product';
import { DashboardContext } from '@/context/DashboardContext';
import { DragDropContext, Draggable, type DropResult, Droppable } from '@hello-pangea/dnd';
import { ActionIcon, Button, Container, Group, Modal, Text, Stack, TableTd, TextInput, Title, Textarea, NumberInput, rem, Box, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCurrencyDollar, IconEdit, IconEye, IconGripVertical, IconPlus, IconTrash } from '@tabler/icons-react';
import { DataTable, DataTableColumn, DataTableDraggableRow } from 'mantine-datatable';
import { useState } from 'react';
import { modals } from '@mantine/modals';

interface RecordData {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}


export default function ProductEditor({u_id, s_id, p, save }: {u_id?: string, s_id?: string, p?: any, save: boolean}) {

    // const { userData, setUserData, activeShopIndex } = useContext(DashboardContext)
    //const activeShop = userData.shops[activeShopIndex]
    const [products, setProducts] = useState<any[]>(p || []);
    const [orderChanged, setOrderChanged] = useState(false)
    const [createModalOpened, { open, close }] = useDisclosure(false);

    const form = useForm({
        initialValues: {
            name: '',
            description: '',
            price: 0,
            quantity: 0
        },
    });

    const handlecreateproduct = async (values: any) => {
        console.log("handle create got: ", values)
        const { name, description, price, quantity } = values

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

    const handleDragEnd = (result: DropResult) => {
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

    const columns: DataTableColumn<RecordData>[] = [
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
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            error={form.errors.name && 'Invalid name.'}
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
                        <NumberInput
                            required
                            leftSection={(<IconCurrencyDollar style={{ width: rem(16), height: rem(16) }} />)}
                            label="Price"
                            value={form.values.price}
                            onChange={(event) => form.setFieldValue('price', Number(event))}
                            placeholder="9.99"
                        />
                        <NumberInput
                            label="Quantity"
                            value={form.values.quantity}
                            description="How many do you have?"
                            onChange={(event) => form.setFieldValue('quantity', Number(event))}
                            placeholder="100"
                        />
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Button type="submit" fullWidth mt="xl">
                            Add
                        </Button>
                    </Group>
                </form>
            </Modal>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <DataTable<RecordData>
                        columns={columns}
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
