import "@/styles/globals.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Theme from "@/components/Theme";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={Theme} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
