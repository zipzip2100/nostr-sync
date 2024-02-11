"use client";
import React from "react";
import { ColorModeScript, ChakraProvider } from "@chakra-ui/react";

import theme from "./theme";
import Layout from "./Layout";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Layout>{children}</Layout>
      </ChakraProvider>
    </>
  );
}
