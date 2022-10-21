import { InfoFoods, Order } from "@/models/interfaces/TypesFood";
import {
  Box,
  Button,
  HStack,
  Input,
  useControllableState,
  useNumberInput,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { store } from "store/store";
import { observer } from "mobx-react-lite";
type Props = {
  index: number;
  data: InfoFoods;
  // value: number;
  list?: boolean;
  order: Order;
  orders: Order[];
  // setValue: (value: number) => void;
  addToCart: (clickedItem: Order) => void;
  removeFromCart: (id: number) => void;
};

const ButtonAdd = observer(
  ({ index, data, addToCart, removeFromCart, list, order, orders }: Props) => {
    const eqZero = order?.amount === 0;
    const gtTen = order?.amount === 10;
    useEffect(() => {}, [order]);

    // console.log("buttonAdd Order", order);

    return (
      <HStack maxW="320px" mx="auto" key={data.id}>
        <Button
          width={{ base: "10px" }}
          onClick={() => {
            removeFromCart(Number(order?.id));
          }}
          disabled={eqZero ? true : false}
          pointerEvents={eqZero ? "none" : undefined}
        >
          -
        </Button>
        <Box
          textAlign={"center"}
          width={{ base: "50px", sm: "50px", md: "50px", xl: "80px" }}
        >
          <span>
            {orders
              .filter((item) => {
                return parseInt(item.id) === index;
              })
              .map((item) => {
                return <>{item.amount}</>;
              })}
          </span>
        </Box>

        <Button
          id={`${data.i18n}`}
          name={`${data.i18n}`}
          width={{ base: "10px" }}
          disabled={gtTen ? true : false}
          pointerEvents={gtTen ? "none" : undefined}
          onClick={() => {
            addToCart({ ...order });
          }}
        >
          +
        </Button>
      </HStack>
    );
  }
);
export default ButtonAdd;
