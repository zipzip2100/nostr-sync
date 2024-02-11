"use client";
import React from "react";
import { ColorModeScript, ChakraProvider } from "@chakra-ui/react";

import theme from "./theme";
import Layout from "./Layout";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
}
export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Providers>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Layout>{children}</Layout>
      </Providers>
    </>
  );
}
