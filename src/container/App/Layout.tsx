"use client";
import React from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  // fix chakra-ui color mode issue
  React.useEffect(() => {
    async function setDark() {
      if (localStorage.getItem("chakra-ui-color-mode") === null) {
        toggleColorMode();
      }
    }
    setDark();
  }, [colorMode, toggleColorMode]);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>Nostr Sync</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Box>{children}</Box>
    </>
  );
}
