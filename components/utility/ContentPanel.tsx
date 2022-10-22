import { InfoFoods, Order, OrderFoods } from "@/models/interfaces/TypesFood";
import React from "react";
import {
  Badge,
  Box,
  Image,
  Input,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import ButtonAdd from "./ButtonAdd";
import { category } from "@/models/const/category";

type Props = {
  food: OrderFoods | undefined;
  orders: Order[];
  type: string;
  addToCart: (clickedItem: Order) => void;
  removeFromCart: (id: number) => void;
};

function ContentPanel({
  food,
  orders,
  addToCart,
  removeFromCart,
  type,
}: Props) {
  // ------------ Device conditon--------------------
  const [isMaxWidth767, isMinToMAX, isDisplay] = useMediaQuery([
    "(max-width: 767px)",
    "(min-width: 767px) and (max-width: 1279px)",
    "(min-width: 1279px)",
  ]);
  return (
    <>
      {type === "all" ? (
        <>
          {category?.map((cat) => {
            return (
              <>
                <Text fontSize={20} my={5}>
                  {cat.i18n}
                </Text>
                <SimpleGrid
                  columns={{ base: 1, sm: 1, md: 1, xl: 3 }}
                  spacing={5}
                >
                  {food?.[cat.key]?.map((data: InfoFoods, index: number) => {
                    return (
                      <div key={data.id}>
                        <div>
                          <Box
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            display={{
                              base: "flex",
                              sm: "flex",
                              md: "flex",
                              xl: "block",
                            }}
                            alignItems="center"
                          >
                            <SimpleGrid
                              columns={{ base: 2, sm: 2, md: 3, xl: 1 }}
                            >
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
                                  xl: "50%",
                                }}
                              />
                              <Box p="2">
                                <Box display="flex" alignItems="baseline">
                                  <Badge
                                    borderRadius="full"
                                    px="2"
                                    colorScheme="teal"
                                  >
                                    เนื้อหมู
                                  </Badge>
                                </Box>

                                <Box
                                  mt="1"
                                  fontWeight="semibold"
                                  as="h4"
                                  lineHeight="tight"
                                  noOfLines={1}
                                >
                                  {data.i18n}
                                  {isDisplay ? (
                                    <Box
                                      pr="10px"
                                      display={"center"}
                                      alignItems="center"
                                      justifyContent={"center"}
                                    >
                                      <ButtonAdd
                                        index={parseInt(data.id)}
                                        orders={orders}
                                        data={data}
                                        addToCart={addToCart}
                                        removeFromCart={removeFromCart}
                                      />
                                    </Box>
                                  ) : null}
                                </Box>
                                {isMaxWidth767 ? (
                                  <Box
                                    pr="10px"
                                    display={"center"}
                                    alignItems="center"
                                    justifyContent={"center"}
                                  >
                                    <ButtonAdd
                                      index={parseInt(data.id)}
                                      orders={orders}
                                      data={data}
                                      addToCart={addToCart}
                                      removeFromCart={removeFromCart}
                                    />
                                  </Box>
                                ) : null}
                              </Box>
                              {isMinToMAX ? (
                                <Box
                                  pr="10px"
                                  display={"center"}
                                  alignItems="center"
                                  justifyContent={"center"}
                                >
                                  <ButtonAdd
                                    index={parseInt(data.id)}
                                    orders={orders}
                                    data={data}
                                    addToCart={addToCart}
                                    removeFromCart={removeFromCart}
                                  />
                                </Box>
                              ) : null}
                            </SimpleGrid>
                          </Box>
                        </div>
                      </div>
                    );
                  })}
                </SimpleGrid>
              </>
            );
          })}
        </>
      ) : (
        <>
          {category
            .filter((item) => {
              return item.key === type;
            })
            .map((cat) => {
              return (
                <>
                  {" "}
                  <Text fontSize={20} my={5}>
                    {cat.i18n}
                  </Text>
                  <SimpleGrid
                    columns={{ base: 1, sm: 1, md: 1, xl: 3 }}
                    spacing={5}
                  >
                    {food?.[cat.key]?.map((data: InfoFoods, index: number) => {
                      return (
                        <div key={data.id}>
                          <div>
                            <Box
                              borderWidth="1px"
                              borderRadius="lg"
                              overflow="hidden"
                              display={{
                                base: "flex",
                                sm: "flex",
                                md: "flex",
                                xl: "block",
                              }}
                              alignItems="center"
                            >
                              <SimpleGrid
                                columns={{ base: 2, sm: 2, md: 3, xl: 1 }}
                              >
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
                                    xl: "50%",
                                  }}
                                />
                                <Box p="2">
                                  <Box display="flex" alignItems="baseline">
                                    <Badge
                                      borderRadius="full"
                                      px="2"
                                      colorScheme="teal"
                                    >
                                      เนื้อหมู
                                    </Badge>
                                  </Box>

                                  <Box
                                    mt="1"
                                    fontWeight="semibold"
                                    as="h4"
                                    lineHeight="tight"
                                    noOfLines={1}
                                  >
                                    {data.i18n}
                                    {isDisplay ? (
                                      <Box
                                        pr="10px"
                                        display={"center"}
                                        alignItems="center"
                                        justifyContent={"center"}
                                      >
                                        <ButtonAdd
                                          index={parseInt(data.id)}
                                          orders={orders}
                                          data={data}
                                          addToCart={addToCart}
                                          removeFromCart={removeFromCart}
                                        />
                                      </Box>
                                    ) : null}
                                  </Box>
                                  {isMaxWidth767 ? (
                                    <Box
                                      pr="10px"
                                      display={"center"}
                                      alignItems="center"
                                      justifyContent={"center"}
                                    >
                                      <ButtonAdd
                                        index={parseInt(data.id)}
                                        orders={orders}
                                        data={data}
                                        addToCart={addToCart}
                                        removeFromCart={removeFromCart}
                                      />
                                    </Box>
                                  ) : null}
                                </Box>
                                {isMinToMAX ? (
                                  <Box
                                    pr="10px"
                                    display={"center"}
                                    alignItems="center"
                                    justifyContent={"center"}
                                  >
                                    <ButtonAdd
                                      index={parseInt(data.id)}
                                      orders={orders}
                                      data={data}
                                      addToCart={addToCart}
                                      removeFromCart={removeFromCart}
                                    />
                                  </Box>
                                ) : null}
                              </SimpleGrid>
                            </Box>
                          </div>
                        </div>
                      );
                    })}
                  </SimpleGrid>
                </>
              );
            })}
        </>
      )}
    </>
  );
}

export default ContentPanel;
