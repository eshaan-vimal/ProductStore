import { Routes, Route } from 'react-router-dom';
import { Box, VStack, useColorModeValue } from '@chakra-ui/react';

import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';


function App() {

  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.800")}>
      <VStack>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/create" element={<CreatePage/>} />
        </Routes>
        </VStack>
      </Box>
    </>
  );
}

export default App;
