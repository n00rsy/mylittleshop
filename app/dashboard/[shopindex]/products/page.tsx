'use client';

import { createProduct, deleteProduct } from '@/actions/product';
import { DashboardContext } from '@/context/DashboardContext';
import { type DropResult, Droppable } from '@hello-pangea/dnd';
import { ActionIcon, Button, Container, Group, Modal, Text, Stack, TableTd, TextInput, Title, Textarea, NumberInput, rem, Box, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCurrencyDollar, IconEdit, IconEye, IconGripVertical, IconPlus, IconTrash } from '@tabler/icons-react';
import { DataTable, DataTableColumn, DataTableDraggableRow } from 'mantine-datatable';
import { act, useContext, useState } from 'react';
import { modals } from '@mantine/modals';
import ProductEditor from '@/components/ProductEditor/ProductEditor';

interface RecordData {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

const test_products = [
    {
        "id": "13-8de2-6f934969a0f1",
        "name": "Candy Bar",
        "description": "21716 Ratke Drive",
        "price": 101.50,
        "quantity": 1000,
        "images": "bruh idk"
    },
    {
        "id": "1323addd-a4ac-4dd2-8de2-6f934969a0f1",
        "name": "Elephant",
        "description": "elephant, (family Elephantidae), largest living land animal, characterized by its long trunk (elongated upper lip and nose), columnar legs, and huge head with temporal glands and wide, flat ears. Elephants are grayish to brown in colour, and their body hair is sparse and coarse. They are found most often in savannas, grasslands, and forests but occupy a wide range of habitats, including deserts, swamps, and highlands in tropical and subtropical regions of Africa and Asia.",
        "price": 9999.99,
        "quantity": 5,
        "images": "bruh idk"
    },
    {
        "id": "1323addd-e2-6f934969a0f1",
        "name": "Pineapple",
        "description": "a healthy fruit for your needs.",
        "price": 10.99,
        "quantity": 300,
        "images": "bruh idk"
    },
]

export default function Products() {

    const { userData, activeShopIndex } = useContext(DashboardContext)
    const activeShop = userData.shops[activeShopIndex]
    const [products, setProducts] = useState<any[]>(activeShop.products);
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

        const createdProduct = await createProduct(values, activeShop._id, userData._id)
        const items = Array.from(products);
        items.push(createdProduct)
        setProducts(items)

        close()
        form.reset();
    }

    const handledeleteproduct = async (product: any) => {
        await deleteProduct(product._id, activeShop._id, userData._id)
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

            <Container>
                <Title>Products</Title>
                <ProductEditor save={true} u_id={userData._id} s_id={activeShop._id} p={activeShop.products}></ProductEditor>
            </Container>
        </>
    );
}
