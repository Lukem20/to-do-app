import React from 'react';
import '../styles/globals.css';
import theme from "../styles/theme"
import initAuth from '../utils/initAuth';
import { ChakraProvider } from '@chakra-ui/react';

import "@fontsource/montserrat/500.css"
import "@fontsource/quicksand/500.css"



initAuth()

function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
		<ChakraProvider theme={theme}>
		 <Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp
