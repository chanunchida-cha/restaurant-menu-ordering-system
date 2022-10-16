import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";
import React from "react";

function ButtonAdd() {
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
  return (
    <HStack maxW="320px" mx="auto">
      <Button {...dec}>-</Button>
      <Input
        {...input}
        textAlign="center"
        width={{ base: "50px", sm: "50px", md: "50px", xl: "80px" }}
      />
      <Button {...inc}>+</Button>
    </HStack>
  );
}

export default ButtonAdd;
