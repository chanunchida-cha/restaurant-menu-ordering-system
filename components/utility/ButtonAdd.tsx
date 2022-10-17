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
};

const ButtonAdd = observer((props: Props) => {
  const { index, data } = props;
  const [value, setValue] = useState(0);
  const [order, setOrder] = useState([
    { id: "1", i18n: "", src: "", category: "", amount: NaN },
  ]);
  const [internalValue, setInternalValue] = useControllableState({
    value,
    onChange: setValue,
  });

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: 10,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  function add() {
    const i = index + 1;
    const newData = {
      id: data.id,
      i18n: data.i18n,
      src: data.src,
      category: data.category,
      amount: value,
    };
    const datas: any = order.map((item) => {
      // const value = { ...item };
      return parseInt(item?.id) === i
        ? ((item.id = data.id),
          (item.i18n = data.i18n),
          (item.src = data.src),
          (item.category = data.category),
          (item.amount = value))
        : [...order, { ...newData }];
    });

    setOrder(datas);
  }

  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <HStack maxW="320px" mx="auto" key={index}>
      <Button
        {...dec}
        width={{ base: "10px" }}
        onClick={() => {
          setInternalValue(value - 1);
        }}
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
          add();
        }}
      >
        +
      </Button>
    </HStack>
  );
});
export default ButtonAdd;
