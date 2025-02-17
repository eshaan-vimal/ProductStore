import { useState } from 'react';
import { Container, VStack, Heading, Box, Input, Button, useColorModeValue, useToast } from '@chakra-ui/react';

import useProductStore from '../store/product.js';


function CreatePage ()
{
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });

    const {createProduct} = useProductStore();

    const toast = useToast();


    async function handleAddProduct ()
    {
        console.log(newProduct);
        const {success, message} = await createProduct(newProduct);

        if (!success)
        {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        else
        {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }

        setNewProduct({
            name: "",
            price: "",
            image: "",
        });
    }


    return (
        <Container>
            <VStack spacing={4}>

                <Heading size={"2xl"} textAlign={"center"} mt={"5"} mb={"8"}>
                    Create New Product
                </Heading>

                <Box w={"full"} bg={useColorModeValue("white", "gray.700")} p={"6"} rounded={"xl"} shadow={"md"}>
                    <VStack spacing={"5"}>
                        <Input placeholder="Product Name" name="name" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
                        <Input placeholder="Product Price" name="price" type="number" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
                        <Input placeholder="Product Image" name="image" value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} />
                        <Button w="full" bg={useColorModeValue("gray.400", "cyan.600")} onClick={handleAddProduct}>Add Product</Button>
                    </VStack>
                </Box>

            </VStack>
        </Container>
    );
}

export default CreatePage;