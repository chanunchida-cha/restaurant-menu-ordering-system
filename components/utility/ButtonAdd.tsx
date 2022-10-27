import { InfoFoods, Order } from "@/models/interfaces/TypesFood";
import { Box, Button, HStack } from "@chakra-ui/react";
import React from "react";

import { observer } from "mobx-react-lite";
type Props = {
  index: number;
  data: InfoFoods;
  orders: Order[];
  addToCart: (clickedItem: Order) => void;
  removeFromCart: (id: number) => void;
};

const ButtonAdd = ({
  index,
  data,
  addToCart,
  removeFromCart,
  orders,
}: Props) => {
  const findIndex = orders.find((item) => {
    return parseInt(item.id) === index;
  });

  const eqZero = findIndex?.amount === 0;
  const gtTen = findIndex?.amount === 10;

  // console.log("findIndex", findIndex);

  return (
    <HStack maxW="320px" key={data.id}>
      <Button
     
        size={{
          base: "sm",
          xs: "sm",
          sm: "sm",
          md: "lg",
          lg: "lg",
          xl: "lg",
        }}
        onClick={() => {
          removeFromCart(Number(findIndex?.id));
        }}
        disabled={eqZero ? true : false}
        pointerEvents={eqZero ? "none" : undefined}
        fontSize={{
          base: "sm",
          xs: "xs",
          sm: "sm",
          md: "md",
          lg: "md",
          xl: "md",
        }}
      >
        -
      </Button>
      <Box
        textAlign={"center"}
        width={{ base: "20px", xs: "8px", sm: "50px", md: "50px", xl: "80px" }}
        fontSize={{
          base: "sm",
          xs: "xs",
          sm: "sm",
          md: "md",
          lg: "md",
          xl: "md",
        }}
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
        size={{
          base: "sm",
          xs: "sm",
          sm: "sm",
          md: "lg",
          lg: "lg",
          xl: "lg",
        }}
        disabled={gtTen ? true : false}
        pointerEvents={gtTen ? "none" : undefined}
        onClick={() => {
          addToCart(findIndex!);
        }}
        fontSize={{
          base: "sm",
          xs: "xs",
          sm: "sm",
          md: "md",
          lg: "md",
          xl: "md",
        }}
      >
        +
      </Button>
    </HStack>
  );
};

export default ButtonAdd;
