import { Box, Heading } from "@chakra-ui/core";
import React from "react";
import { ComponentLink, stringToUrl, TopNavLink, SideNavLink } from "./NavLink";
import fetcher from "../lib/fetcher";
import useSWR from "swr";
import Link from "next/link";

const NavGroupHeading = props => (
  <Heading
    fontSize="xs"
    color="gray.400"
    letterSpacing="wide"
    mb={2}
    textTransform="uppercase"
    {...props}
  />
);

export const SideNavContent = ({
  contentHeight = "calc(100vh - 4rem)",
  ...props
}) => {
  const { data, error } = useSWR("/api/allRecords", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Box
      top="4rem"
      position="relative"
      overflowY="auto"
      borderRightWidth="1px"
      {...props}
    >
      <Box
        as="nav"
        height={contentHeight}
        aria-label="Main navigation"
        fontSize="sm"
        p="6"
      >
        <Box mb="10">
          <NavGroupHeading>Records</NavGroupHeading>
          {data.allRecords.map((record, index) => {
            return (
              <div key={"record" + index}>
                <ComponentLink
                  nextAs={`/record/${record.slug}`}
                  href={`/record/[slug]`}
                >
                  {record.slug}
                </ComponentLink>
              </div>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

const SideNavContainer = props => (
  <Box
    position="fixed"
    left="0"
    width="100%"
    height="100%"
    top="0"
    right="0"
    {...props}
  />
);

const SideNav = props => {
  return (
    <SideNavContainer {...props}>
      <SideNavContent />
    </SideNavContainer>
  );
};

export default SideNav;
