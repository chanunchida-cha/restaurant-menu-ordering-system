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
import { observer } from "mobx-react-lite";
import { store } from "store/store";

const DrawerOrder = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  return (
    <div className="mt-5">

      <Button
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        px={{ base: "130px", sm: "40px" }}
        // size={{ base: "sm", sm: "sm", md: "md" }}
   
      >
        รายการอาหาร
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
            <Button colorScheme="blue" onClick={() => {}}>
              ดำเนินการสั่งอาหาร
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
});

export default DrawerOrder;
