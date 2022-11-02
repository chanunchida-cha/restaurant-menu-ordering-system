import React, { ReactElement } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import DrawerOrder from "../utility/DrawerOrder";
import { observer } from "mobx-react-lite";
import { store } from "store/store";
import History from "../utility/History";

interface Props {}

const Navbar = observer(({}: Props): ReactElement => {
  const timeStart = new Date().toLocaleTimeString("it-IT");
  const end = new Date().getTime() + Number(90) * 60 * 1000;
  const endTime = new Date(end).toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className=" w-screen h-[230px]  z-10 fixed top-0 sticky-0 left-0 rigth-0 bg-white ">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3  mb-4 mx-3 mt-5 sm:mt-5 md:mt-10 lg:mt-10 xl:mt-10 sm:mx-3 md:mx-12 lg:mx-12 xl:mx-36">
        <div className="pl-4">
          <Box height="80px">
            <Image
              src="images/logo-red.png"
              boxSize={{
                base: "80px",
                xxs: "80px",
                xs: "80px",
                sm: "85px",
                md: "100px",
                lg: "100px",
                xl: "100px",
              }}
              alt="logo"
            />
          </Box>
        </div>
        <div className="grid grid-rows-3  md:pl-16 lg:pl-20 xl:pl-32">
          <div className="row-start-2 flex  text-base sm:text-base xl:text-lg">
            {`โต๊ะ:  `}{" "}
            <div className="text-[#D52D2C] font-semibold pl-1 "> A1</div>
          </div>
          <div className="row-start-3 flex  text-sm sm:text-sm xl:text-lg pl">
            {`หมดเวลา   `}{" "}
            <div className="text-[#D52D2C] font-semibold pl-1">
              {endTime} น.
            </div>
          </div>
        </div>

        <div className="col-start-3 sm:col-start-3 grid grid-rows-3">
          <div className="row-start-2">
            <History />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Navbar;
