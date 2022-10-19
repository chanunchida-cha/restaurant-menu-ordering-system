import React, { ReactElement } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import DrawerOrder from "../utility/DrawerOrder";
import { observer } from "mobx-react-lite";
import { store } from "store/store";

interface Props {}

const Navbar = observer(({}: Props): ReactElement => {
  return (
    <div className="grid grid-cols-3 mb-4">
      <div>
        <Box height="100px">
          <Image src="images/logo-red.png" boxSize="100px" alt="logo" />
        </Box>
      </div>
      <div>
        <Box width={{ base: "100%", sm: "100%", md: "50%" }}>
          <Text
            bg="#D52D2C"
            py={{ base: 2, sm: 1, md: 2 }}
            borderRadius={5}
            color={"white"}
            paddingLeft={{ base: 5, sm: 4, md: 5 }}
          >
            โต๊ะที่ 1
          </Text>{" "}
          <br />
          <Text
            py={{ base: 2, sm: 1, md: 2 }}
            borderRadius={5}
            paddingLeft={{ base: 5, sm: 4, md: 5 }}
          >
            Hai Thi Ter Shabu
          </Text>
        </Box>
      </div>
      <div>
        
      </div>
    </div>
  );
});

export default Navbar;
