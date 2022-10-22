import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import { store } from "store/store";

const History = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  return (
    <>
      {" "}
      <Button
        ref={btnRef}
        bg="#D52D2C"
        color=" white"
        size={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
        _hover={{ bg: "#af1212", color: " white" }}
        onClick={onOpen}
      >
        ประวัติรายการอาหาร
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>ประวัติออเดอร์</DrawerHeader>

          <DrawerBody>
            {store.order.map((item) => {
              return item.map((data) => {
                return <>{data.i18n}</>;
              });
            })}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
});

export default History;
