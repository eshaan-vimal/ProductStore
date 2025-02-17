import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, VStack, Text, useColorModeValue, SimpleGrid } from '@chakra-ui/react';

import ProductCard from '../components/ProductCard.jsx';
import useProductStore from '../store/product.js'


function HomePage ()
{
    const {fetchProducts, deleteProduct, products} = useProductStore();

    useEffect(() =>
    {
        fetchProducts();
    },
    [fetchProducts]);

    console.log(products)


    return (
        <Container maxW={"full"} py={5}>
            <VStack spacing={12}>

                <Text fontSize={30} fontWeight={"bold"} bgGradient={useColorModeValue("linear(to-r, gray.600, gray.900)" ,"linear(to-r, cyan.400, blue.500)")} bgClip={"text"} textAlign={"center"}>
                    Current Products
                </Text>

                {products.length === 0 && (
                    <Text fontSize={"2xl"} fontWeight={"bold"} fontStyle={"italic"} textAlign={"center"} p={5}>
                        No Products found 👎<br />
                        <Text as={"span"} bgGradient={useColorModeValue("linear(to-r, gray.600, gray.900)" ,"linear(to-r, cyan.400, blue.500)")} bgClip={"text"}>
                            <Link to="/create">Create a Product</Link>
                        </Text>
                    </Text>
                )}


                <SimpleGrid w="full" columns={{base: 1, md: 2, lg: 3}} spacing={10}>
                    {products.map((product) => (<ProductCard key={product._id} product={product} />))}
                </SimpleGrid>

            </VStack>
        </Container>
    );
}

export default HomePage;