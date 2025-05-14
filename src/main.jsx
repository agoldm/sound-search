import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import App from './App.jsx';
import config from './theme.js';

const system = createSystem(defaultConfig, config);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </StrictMode>
);