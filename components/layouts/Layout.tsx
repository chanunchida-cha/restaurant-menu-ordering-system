import React, { ReactElement } from "react";
import Navbar from "./Navbar";
import { Container, Grid, GridItem, Center } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props): ReactElement {
  return (
    <Grid
      templateAreas={`"header header"
    "main main"`}
      pt={{ base: 10, sm: 10, md: 20 }}
      mx={{ base: 2, sm: 5, md: 10, xl: 32 }}
    >
      <GridItem pl="2" area={"header"}>
        <Navbar />
      </GridItem>
      <GridItem pl="2" area={"main"}>
        <main>{children}</main>
      </GridItem>
    </Grid>
  );
}

export default Layout;
