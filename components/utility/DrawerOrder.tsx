import React, { useRef } from "react";
import {
  Image,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  useToast,
  Box,
  Badge,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { store } from "store/store";
import { Order } from "@/models/interfaces/TypesFood";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import ButtonAdd from "./ButtonAdd";

type Props = {
  totalOrder: number;
  orders: Order[];
  isDisplay?: boolean;
  clearAmount: () => void;
  addToCart: (clickedItem: Order) => void;
  removeFromCart: (id: number) => void;
};

const DrawerOrder = observer((props: Props) => {
  const {
    orders,
    totalOrder,
    addToCart,
    removeFromCart,
    clearAmount,
    isDisplay,
  } = props;
  const toast = useToast({
    title: "สั่งรายการอาหารเรียบร้อยแล้ว",
    description: "ลูกค้าจะได้รับอาหารไม่เกิน 5 นาที",
    status: "success",
    position: "top",
    duration: 3000,
    isClosable: true,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const result = orders.filter((item) => {
    return item.amount > 0;
  });

  return (
    <div className="mt-5 px-10">
      <Button
        ref={btnRef}
        rounded={isDisplay ? "5px" : "5px"}
        onClick={onOpen}
        px={
          isDisplay
            ? { base: "10px", md: "30px" }
            : { base: "120px",xxxs:"70px",xxs:"100px", sm: "150px",lg:"200px" }
        }
        bg="#D52D2C"
        color=" white"
        _hover={{ bg: "#af1212", color: " white" }}
      >
        {isDisplay ? (
          <>
            {" "}
            <ShoppingCartIcon className="h-6 w-6 text-white" />
            {totalOrder > 0 && totalOrder}
          </>
        ) : (
         `รายการอาหาร   ${totalOrder}`
        )}
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
          <DrawerHeader my={10}>รายการอาหาร</DrawerHeader>

          {totalOrder === 0 ? (
            <DrawerBody>
              <div>ไม่มีรายการอาหารในตะกร้า</div>
            </DrawerBody>
          ) : (
            <DrawerBody>
              {orders
                .filter((item) => {
                  return item.amount > 0;
                })
                .map((order, index: number) => {
                  return (
                    <div className="grid grid-cols-6 py-5  border-b">
                    <div className="col-start-1 ">
                      <Image
                        display={{ xl: "block" }}
                        mx={{ base: "auto", sm: 2, xl: "auto" }}
                        src={`/images/${order.src}`}
                        alt={order.i18n}
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
                              {order.i18n}
                            </Box>
                       
                      </div>
                    </div>

                    <div className=" col-start-5 col-span-2 flex justify-end  ">
                  
                          {" "}
                          <Box
                            pr="10px"
                            display={"center"}
                            alignItems="center"
                            justifyContent={"center"}
                          >
                            <ButtonAdd
                              index={parseInt(order.id)}
                              orders={orders}
                              data={order}
                              addToCart={addToCart}
                              removeFromCart={removeFromCart}
                            />
                          </Box>
                        </div>
                 
                  </div>
                  );
                })}
            </DrawerBody>
          )}

          <DrawerFooter>
            <Button
              bg="#D52D2C"
              color=" white"
              width={"full"}
              _hover={{ bg: "#af1212", color: " white" }}
              _disabled={{ bg: "#60606091" }}
              onClick={() => {
                onClose();
                store.addOrder(result);
                clearAmount();
                toast();
              }}
              disabled={totalOrder === 0 ? true : false}
              pointerEvents={totalOrder === 0 ? "none" : undefined}
            >
              ดำเนินการสั่งอาหาร
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
});

export default DrawerOrder;
