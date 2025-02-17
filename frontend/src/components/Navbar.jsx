import { Link } from 'react-router-dom';
import { Container, Flex, Text, HStack, Button, useColorModeValue, useColorMode } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';


function Navbar ()
{
    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <>
        <Container maxW={"full"} bg={useColorModeValue("gray.200", "gray.900")} px={5} py={3} mb={6}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{base: "column", sm: "row"}}>
                
                <Text fontSize={{base: "22", sm: "28"}} fontWeight={"bold"} textTransform={"uppercase"} textAlign={"center"} bgGradient={useColorModeValue("linear(to-r, gray.600, gray.900)" ,"linear(to-r, cyan.400, blue.500)")} bgClip={"text"}>
                    <Link to="/">Product Store 🛒</Link>
                </Text>
                
                <HStack spacing={2}>
                    <Link to="/create"><Button><PlusSquareIcon fontSize={"22"} /></Button></Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon fontSize={"22"} /> : <LuSun fontSize={"22"} />}
                    </Button>
                </HStack>

            </Flex>
        </Container>
        </>
    );
}

export default Navbar;
