import {
  Badge,
  Box,
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

  console.log(store.historyShow);

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
          <DrawerHeader mt={"5"}>ประวัติรายการอาหาร</DrawerHeader>

          {store.order.length === 0 ? (
            <DrawerBody>ไม่มีประวัติรายการอาหาร</DrawerBody>
          ) : (
            <DrawerBody>
              {store.historyShow.map((item, index: number) => {
                return (
                  <>
                    {item.map((data, i: number) => {
                      return (
                       <div className={
                        index < 1
                          ? "mb-5 border-r-8 border-[#6095d2]"
                          : "mb-5 border-r-8 border-[#43a595]"
                      } key={data.id}>
                         <div
                          className="grid grid-cols-6 py-5  border-b"
                          
                        >
                          <div className="col-start-1 ">
                            <Image
                              display={{ xl: "block" }}
                              mx={{ base: "1", sm: 2, xl: "auto" }}
                              src={`/images/${data.src}`}
                              alt={data.i18n}
                              textAlign="center"
                              width={{
                                base: "100%",
                                sm: "60%",
                                md: "60%",
                                lg: "50%",
                                xl: "80%",
                              }}
                              fontSize={{
                                base: "sm",
                                xs: "sm",
                                sm: "sm",
                                md: "md",
                                lg: "md",
                                xl: "md",
                              }}
                            />
                          </div>
                          <div className=" pt-3 pl-2 col-start-2 col-span-3  ">
                            <div className="">
                              <Box
                                mt="1"
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                                noOfLines={1}
                                fontSize={{
                                  base: "sm",
                                  xs: "sm",
                                  sm: "sm",
                                  md: "md",
                                  lg: "md",
                                  xl: "md",
                                }}
                              >
                                {data.i18n}
                              </Box>
                            </div>
                          </div>
                          <div className="col-span-2 ">
                            <div className="grid grid-cols-3 ">
                              <div className="col-span-1 grid grid-rows-3">
                                <div className=" flex justify-start text-xs sm:text-sm  row-start-2">
                                  x {data.amount}
                                </div>
                              </div>
                              <div className="col-span-2 grid grid-rows-3">
                                
                              <div className="flex text-xs sm:text-sm justify-end pr-10 row-start-2">
                                {index < 1 ? (
                                  <Box display="flex" alignItems="baseline">
                                    <Badge
                                      borderRadius="full"
                                      px="2"
                                      colorScheme="messenger"
                                      fontSize={{
                                        base: "sm",
                                        xs: "sm",
                                        sm: "sm",
                                        md: "md",
                                        lg: "md",
                                        xl: "md",
                                      }}
                                    >
                                      รอเสิร์ฟ
                                    </Badge>
                                  </Box>
                                ) : (
                                  <Box display="flex" alignItems="baseline">
                                    <Badge
                                      borderRadius="full"
                                      px="2"
                                      colorScheme="teal"
                                      fontSize={{
                                        base: "sm",
                                        xs: "sm",
                                        sm: "sm",
                                        md: "md",
                                        lg: "md",
                                        xl: "md",
                                      }}
                                    >
                                      สำเร็จ
                                    </Badge>
                                  </Box>
                                )}
                              </div>
                              </div>
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
          )}

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
});

export default History;
