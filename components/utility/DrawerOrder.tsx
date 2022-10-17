import React, { useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

function DrawerOrder() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        size={{ base: "sm", sm: "sm", md: "md" }}
      >
        รายการสั่งซื้อ
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>รายการอาหาร</DrawerHeader>

          <DrawerBody></DrawerBody>

          <DrawerFooter>
            <Button colorScheme="red.500">ดำเนินการสั่งซื้อ</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerOrder;
