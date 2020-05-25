/** @jsx jsx */
import {
  Box,
  Callout,
  Code,
  Heading,
  Kbd,
  PseudoBox,
  Text,
  useColorMode
} from "@chakra-ui/core";
import { jsx } from "@emotion/core";
import NextLink from "next/link";
import { forwardRef } from "react";

const Pre = props => <Box my="2em" rounded="sm" {...props} />;

const Table = props => (
  <Box as="table" textAlign="left" mt="32px" width="full" {...props} />
);

const THead = props => {
  const { colorMode } = useColorMode();
  const bg = { light: "gray.50", dark: "whiteAlpha.100" };
  return (
    <Box
      as="th"
      bg={bg[colorMode]}
      fontWeight="semibold"
      p={2}
      fontSize="sm"
      {...props}
    />
  );
};

const TData = props => (
  <Box
    as="td"
    p={2}
    borderTopWidth="1px"
    borderColor="inherit"
    fontSize="sm"
    whiteSpace="normal"
    {...props}
  />
);

const Link = forwardRef((props, ref) => (
  <PseudoBox
    as="a"
    ref={ref}
    color="teal.500"
    cursor="pointer"
    textDecoration="underline"
    outline="none"
    _hover={{ opacity: "0.8" }}
    _focus={{ boxShadow: "outline" }}
    {...props}
  />
));

const DocsHeading = props => (
  <Heading
    mb="1em"
    mt="2em"
    css={{
      "&[id]": {
        pointerEvents: "none"
      },
      "&[id]:before": {
        display: "block",
        height: " 6rem",
        marginTop: "-6rem",
        visibility: "hidden",
        content: `""`
      },
      "&[id]:hover a": { opacity: 1 }
    }}
    {...props}
  >
    <Box pointerEvents="auto">
      {props.children}
      {props.id && (
        <PseudoBox
          aria-label="anchor"
          as="a"
          color="teal.500"
          fontWeight="normal"
          outline="none"
          _focus={{ opacity: 1, boxShadow: "outline" }}
          opacity="0"
          ml="0.375rem"
          href={`#${props.id}`}
        >
          #
        </PseudoBox>
      )}
    </Box>
  </Heading>
);

function HeadingSwitcher(props) {
  switch (props.level) {
    case 1:
      return <Heading as="h1" size="xl" my="1em" {...props} />;
    case 2:
      return <DocsHeading as="h2" fontWeight="semibold" size="lg" {...props} />;
    case 3:
      return <DocsHeading as="h3" size="md" fontWeight="medium" {...props} />;
    default:
      return <Heading as={`h${props.level}`} size="xl" my="1em" {...props} />;
  }
}

const MDComponents = {
  heading: props => <HeadingSwitcher {...props} />,
  inlineCode: props => (
    <Code variantColor="yellow" fontSize="0.84em" {...props} />
  ),
  // code: CodeBlock,
  pre: Pre,
  kbd: Kbd,
  br: props => <Box height="24px" {...props} />,
  hr: props => <Box as="hr" borderTopWidth="1px" my={8} {...props} />,
  table: Table,
  th: THead,
  td: TData,
  // link: ({ href, ...props }) => (
  //   <NextLink href={href} passHref>
  //     <Link {...props} />
  //   </NextLink>
  // ),
  link: ({ href, ...props }) => <Link href={href} {...props} />,
  paragraph: props => <Text as="p" mt={4} lineHeight="tall" {...props} />,
  listItem: props => <Box as="li" pb="4px" ml={4} {...props} />,
  blockquote: props => (
    <Callout
      mt={4}
      variant="left-accent"
      status="warning"
      css={{ "> *:first-of-type": { marginTop: 0 } }}
      {...props}
    />
  )
};

// const ChakraProvider = ({ children, theme }) => {
//   return (
//     <ThemeProvider theme={theme}>
//       <ColorModeProvider>
//         <CSSReset />
//         {children}
//       </ColorModeProvider>
//     </ThemeProvider>
//   );
// };

export default MDComponents;
