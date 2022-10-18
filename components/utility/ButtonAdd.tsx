import { InfoFoods, Order } from "@/models/interfaces/TypesFood";
import {
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
  addToCart: (clickedItem: Order) => void;
  removeFromCart: (id: number) => void;
};

const ButtonAdd = observer((props: Props) => {
  const { index, data, addToCart, removeFromCart } = props;
  const [value, setValue] = useState(0);

  const [internalValue, setInternalValue] = useControllableState({
    value,
    onChange: setValue,
  });

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: -1,
      max: 10,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW="320px" mx="auto" key={index}>
      <Button
        {...dec}
        width={{ base: "10px" }}
        onClick={() => {
          setInternalValue(value - 1);
          removeFromCart(parseInt(data.id));
        }}
        disabled={internalValue === 0 ? true : false}
        pointerEvents={internalValue === 0 ? "none" : undefined}
      >
        -
      </Button>
      <Input
        {...input}
        textAlign="center"
        width={{ base: "50px", sm: "50px", md: "50px", xl: "80px" }}
      />
      <Button
        {...inc}
        id={`${data.i18n}`}
        name={`${data.i18n}`}
        width={{ base: "10px" }}
        onClick={() => {
          setInternalValue(value + 1);
          addToCart({ ...data, amount: internalValue });
        }}
      >
        +
      </Button>
    </HStack>
  );
});
export default ButtonAdd;
