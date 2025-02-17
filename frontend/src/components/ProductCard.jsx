import { useState } from 'react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Image, Heading, Text, HStack, IconButton, useColorModeValue, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, Input, ModalFooter, Button } from '@chakra-ui/react';

import useProductStore from '../store/product.js';


function ProductCard ({product})
{
    const {deleteProduct, updateProduct} = useProductStore();
    const toast = useToast();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [updatedProduct, setUpdatedProduct] = useState(product);

    async function handleDeleteProduct (pid)
    {
        const {success, message} = await deleteProduct(pid);

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
    }

    async function handleUpdatedProduct (pid)
    {
        const {success, message} = await updateProduct(pid, updatedProduct);

        onClose();

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
    }


    return (
        <Box bg={useColorModeValue("gray.200", "gray.700")} rounded={"2xl"} shadow={"lg"} overflow={"hidden"} transition={"all 0.3s"} _hover={{transform: "translateY(-5px)", shadow: "2xl"}}>

            <Image src={product.image} alt={product.name} w={"full"} maxh={"60%"} objectFit={"cover"} />

            <Box textAlign={"center"} p={5}>

                <Heading as={"h3"}>
                    {product.name}
                </Heading>

                <Text fontSize={"2xl"} fontWeight={"bold"} mb={5}>
                    ₹{product.price}
                </Text>

                <HStack justifyContent={"center"} spacing={5}>
                    <IconButton icon={<EditIcon />} colorScheme='blue' onClick={onOpen} />
                    <IconButton icon={<DeleteIcon />} colorScheme='red' onClick={() => handleDeleteProduct(product._id)} />
                </HStack>

            </Box>


            <Modal isOpen={isOpen} onClose={onClose}>

                <ModalOverlay />

                <ModalContent>

                    <ModalHeader fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
                        Update Product
                    </ModalHeader>

                    <ModalCloseButton />

                    <ModalBody>
                        <VStack spacing={5}>

                            <Input placeholder="Product Name" name="name" value={updatedProduct.name} onChange={e => setUpdatedProduct({...updatedProduct, name: e.target.value})} />
                            <Input placeholder="Product Price" name="price" value={updatedProduct.price} type="number" onChange={e => setUpdatedProduct({...updatedProduct, price: e.target.value})} />
                            <Input placeholder="Product Image" name="image" value={updatedProduct.image} onChange={e => setUpdatedProduct({...updatedProduct, image: e.target.value})} />

                        </VStack>
                    </ModalBody>

                    <ModalFooter justifyContent={"center"} mb={2}>

                        <Button bg={useColorModeValue("gray.400", "cyan.600")} mr={3} onClick={() => handleUpdatedProduct(product._id)}>
                            Update
                        </Button>

                        <Button bg={useColorModeValue("gray.400", "cyan.600")} ml={3} onClick={onClose}>
                            Cancel
                        </Button>

                    </ModalFooter>

                </ModalContent>

            </Modal>

        </Box>
    );
}

export default ProductCard;