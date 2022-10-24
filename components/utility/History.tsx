import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Image,
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
      <div className="gird grid-cols-3">
        <div className="col-start-3 flex justify-end">
          <Button
            ref={btnRef}
            bg="#D52D2C"
            color=" white"
            size={{ base: "sm", sm: "sm", md: "md" }}
            _hover={{ bg: "#af1212", color: " white" }}
            onClick={onOpen}
          >
            ประวัติรายการอาหาร
          </Button>
        </div>
      </div>

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
          <DrawerHeader>ประวัติรายการอาหาร</DrawerHeader>

          <DrawerBody>
            {store.order.map((item, index: number) => {
              return (
                <>
                  ครั้งที่ {index + 1}
                  {item.map((data, i: number) => {
                    return (
                      <div key={i} className="mb-5">
                        <div className="grid grid-cols-5 border-b" key={index}>
                          <div>
                            <Image
                              display={{ xl: "block" }}
                              mx={{ base: "auto", sm: 2, xl: "auto" }}
                              src={`/images/${data.src}`}
                              alt={data.i18n}
                              textAlign="center"
                              width={{
                                base: "80%",
                                sm: "60%",
                                md: "50%",
                                xl: "100%",
                              }}
                            />
                          </div>
                          <div className="col-span-2 grid grid-rows-3">
                            <span className="row-start-2 inline-block align-middle">
                              {data.i18n}
                            </span>
                          </div>
                          <div className="col-span-2 grid grid-rows-3">
                            <div className="flex justify-end pr-10 row-start-2">
                              {data.amount}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              );
            })}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
});

export default History;
