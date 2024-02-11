"use client";
import { extendTheme, type ThemeConfig, theme as chakraTheme } from "@chakra-ui/react";

const { Avatar, Divider, Tag, Button } = chakraTheme.components;

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  ...config,
  components: {
    Button,
    Avatar,
    Divider,
    Tag,
  },
});

export default theme;
