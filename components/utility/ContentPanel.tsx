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
  searchText: string;
  addToCart: (clickedItem: Order) => void;
  removeFromCart: (id: number) => void;
};

function ContentPanel({
  food,
  orders,
  addToCart,
  removeFromCart,
  type,
  searchText,
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
                {searchText === "" && (
                  <Text fontSize={16} my={5}>
                    {cat.i18n}
                  </Text>
                )}
                <SimpleGrid
                  columns={{ base: 1, sm: 1, md: 1, xl: 3 }}
                  spacing={5}
                  my={5}
                >
                  {food?.[cat.key]
                    ?.filter(
                      (data) =>
                        data.i18n.includes(searchText) ||
                        cat.i18n.includes(searchText)
                    )
                    .map((data: InfoFoods) => {
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
                              p={5}
                            >
                              <div className="grid grid-cols-5  sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 ">
                                <div className="col-start-1 sm:col-start-1 md:col-start-1 lg:col-start-1 lg:col-span-2  xl:col-start-2 xl:col-span-3">
                                  <Image
                                    display={{ xl: "block" }}
                                    mx={{ base: "auto", sm: 2, xl: "auto" }}
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
                                  />
                                </div>
                                <div className=" col-start-2 col-span-2  sm:col-start-2 sm:col-span-2  md:col-start-2 md:col-span-2  lg:col-start-3 lg:col-span-1  xl:col-start-1">
                              <div className="lg:grid lg:grid-rows-3 xl:row-1">
                                <div className="lg:row-start-2">  
                                <Box display="flex" alignItems="baseline">
                                    <Badge
                                      borderRadius="full"
                                      px="2"
                                      colorScheme="teal"
                                    >
                                      {cat.i18n}
                                    </Badge>
                                  </Box>
                                  <div className="xl:hidden">
                                    <Box
                                      mt="1"
                                      fontWeight="semibold"
                                      as="h4"
                                      lineHeight="tight"
                                      noOfLines={1}
                                      fontSize={{
                                        base: "sm",
                                        xs:"sm",
                                        sm: "sm",
                                        md: "md",
                                        lg:"md",
                                        xl: "md",
                                      }}
                                    >
                                      {data.i18n}
                                    </Box>
                                  </div>
                                </div>

                              </div>
                                </div>
                                <div className="hidden lg:hidden xl:grid xl:col-start-1 xl:col-span-5 xl:pt-2 ">
                                  <Box
                                    mt="1"
                                    fontWeight="semibold"
                                    as="h6"
                                    lineHeight="tight"
                                    noOfLines={1}
                                  >
                                    {data.i18n}
                                  </Box>
                                </div>
                                <div className="col-start-4 sm:col-start-4 md:col-start-4 md:col-span-2  lg:col-start-5  xl:col-start-2 xl:col-span-3 xl:pt-3">
                                  <div className=" lg:grid lg:grid-rows-3 xl:grid-rows-1">
                                    <div className="  lg:row-start-2">
                                      {" "}
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
                                    </div>
                                  </div>
                                </div>
                              </div>
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
                    {food?.[cat.key]
                      ?.filter((data) => data.i18n.includes(searchText))
                      .map((data: InfoFoods, index: number) => {
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
                                p={5}
                              >
                                <div className="grid grid-cols-5  sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 ">
                                  <div className="col-start-1 sm:col-start-1 md:col-start-1 lg:col-start-1 lg:col-span-2  xl:col-start-2 xl:col-span-3">
                                    <Image
                                      display={{ xl: "block" }}
                                      mx={{ base: "auto", sm: 2, xl: "auto" }}
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
                                    />
                                  </div>
                                  <div className=" col-start-2 col-span-2  sm:col-start-2 sm:col-span-2  md:col-start-2 md:col-span-2  lg:col-start-3 lg:col-span-1  xl:col-start-1">
                                <div className="lg:grid lg:grid-rows-3 xl:row-1">
                                  <div className="lg:row-start-2">  
                                  <Box display="flex" alignItems="baseline">
                                      <Badge
                                        borderRadius="full"
                                        px="2"
                                        colorScheme="teal"
                                      >
                                        {cat.i18n}
                                      </Badge>
                                    </Box>
                                    <div className="xl:hidden">
                                      <Box
                                        mt="1"
                                        fontWeight="semibold"
                                        as="h4"
                                        lineHeight="tight"
                                        noOfLines={1}
                                        fontSize={{
                                          base: "sm",
                                          xs:"sm",
                                          sm: "sm",
                                          md: "md",
                                          lg:"md",
                                          xl: "md",
                                        }}
                                      >
                                        {data.i18n}
                                      </Box>
                                    </div>
                                  </div>
  
                                </div>
                                  </div>
                                  <div className="hidden lg:hidden xl:grid xl:col-start-1 xl:col-span-5 xl:pt-2 ">
                                    <Box
                                      mt="1"
                                      fontWeight="semibold"
                                      as="h6"
                                      lineHeight="tight"
                                      noOfLines={1}
                                    >
                                      {data.i18n}
                                    </Box>
                                  </div>
                                  <div className="col-start-4 sm:col-start-4 md:col-start-4 md:col-span-2  lg:col-start-5  xl:col-start-2 xl:col-span-3 xl:pt-3">
                                    <div className=" lg:grid lg:grid-rows-3 xl:grid-rows-1">
                                      <div className="  lg:row-start-2">
                                        {" "}
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
                                      </div>
                                    </div>
                                  </div>
                                </div>
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
