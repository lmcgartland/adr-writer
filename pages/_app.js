import React from "react";
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  Box,
  Text,
  Link,
  Divider
} from "@chakra-ui/core";
import DocsHeader from "../components/DocsHeader";
import SideNav from "../components/SideNav";

const Footer = props => (
  <Box textAlign="center" pt="12" pb="4" fontSize="sm" opacity="0.6" {...props}>
    <Divider />
    {/*<Text mt="5">Released under the CC0 1.0 Universal License.</Text>*/}
    <Text>
      MADR Viewer & Editor by{" "}
      <Link
        color="teal.500"
        href="https://twitter.com/lucasmcgartland"
        target="__blank"
      >
        Lucas McGartland
      </Link>
    </Text>
  </Box>
);

const Main = props => <Box as="main" mx="auto" mb="3rem" {...props} />;

const Layout = ({ children }) => (
  <>
    <DocsHeader />
    <SideNav display={["none", null, "block"]} maxWidth="18rem" width="full" />
    <Box pl={[0, null, "18rem"]} mt="4rem">
      <Main maxWidth="46rem" pt={8} px={5}>
        {children}
        <Footer />
      </Main>
    </Box>
  </>
);

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider>
        <ColorModeProvider value="light">
          <CSSReset />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ColorModeProvider>
      </ThemeProvider>
    </>
  );
}
