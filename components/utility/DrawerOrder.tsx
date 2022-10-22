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
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { store } from "store/store";
import { Order } from "@/models/interfaces/TypesFood";
import ButtonAdd from "./ButtonAdd";

type Props = {
  totalOrder: number;
  orders: Order[];
  addToCart: (clickedItem: Order) => void;
  removeFromCart: (id: number) => void;
};

const DrawerOrder = observer((props: Props) => {
  const { orders, totalOrder, addToCart, removeFromCart } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const result = orders.filter((item) => {
    return item.amount > 0;
  });

  return (
    <div className="mt-5">
      <Button
        ref={btnRef}
        onClick={onOpen}
        px={{ base: "130px", sm: "40px" }}
        bg="#D52D2C"
        color=" white"
        _hover={{ bg: "#af1212", color: " white" }}
      >
        {`รายการอาหาร ${totalOrder}`}
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

          <DrawerBody>
            {orders
              .filter((item) => {
                return item.amount > 0;
              })
              .map((order, index: number) => {
                return (
                  <div className="grid grid-cols-5 border-b-2" key={index}>
                    <div>
                      <Image
                        display={{ xl: "block" }}
                        mx={{ base: "auto", sm: 2, xl: "auto" }}
                        src={`/images/${order.src}`}
                        alt={order.i18n}
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
                        {order.i18n}
                      </span>
                    </div>
                    <div className="col-span-2 grid grid-rows-3">
                      <div className="row-start-2">
                        <ButtonAdd
                          index={parseInt(order.id)}
                          data={order}
                          orders={orders}
                          addToCart={addToCart}
                          removeFromCart={removeFromCart}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </DrawerBody>

          <DrawerFooter>
            <Button
              bg="#D52D2C"
              color=" white"
              _hover={{ bg: "#af1212", color: " white" }}
              onClick={() => {
                store.addOrder(result);
                console.log("SUCCESS", store.order);
              }}
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
