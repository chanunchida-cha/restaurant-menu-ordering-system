import React, { ReactElement } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import DrawerOrder from "../utility/DrawerOrder";
import { observer } from "mobx-react-lite";
import { store } from "store/store";
import History from "../utility/History";

interface Props {}

const Navbar = observer(({}: Props): ReactElement => {
  return (
    <div className="grid grid-cols-3 mb-4">
      <div>
        <Box height="100px">
          <Image src="images/logo-red.png" boxSize="100px" alt="logo" />
        </Box>
      </div>
      <div></div>
      <div >
        <History />
      </div>
    </div>
  );
});

export default Navbar;
