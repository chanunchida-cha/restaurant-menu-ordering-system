import React, { ReactElement } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import DrawerOrder from "../utility/DrawerOrder";
import { observer } from "mobx-react-lite";
import { store } from "store/store";
import History from "../utility/History";

interface Props {}

const Navbar = observer(({}: Props): ReactElement => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3  mb-4">
      <div className="pl-4">
   
        <Box height="100px">
          <Image src="images/logo-red.png" boxSize="100px" alt="logo" />
        </Box>
      </div>

      <div className="col-start-2 sm:col-start-3 grid grid-rows-3">
        <div className="row-start-2">
        <History />
        </div>
      </div>
    </div>
  );
});

export default Navbar;
