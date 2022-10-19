import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Image,
  Input,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";
import { InfoFoods, Order } from "@/models/interfaces/TypesFood";
import ButtonAdd from "../utility/ButtonAdd";
import DrawerOrder from "../utility/DrawerOrder";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const category = [
  { key: "pork", i18n: "เนื้อหมู" },
  { key: "beef", i18n: "เนื้อวัว" },
  { key: "chicken", i18n: "เนื้อไก่" },
  { key: "seafood", i18n: "อาหารทะเล" },
  { key: "meatballs", i18n: "ลูกชิ้น" },
  { key: "vegatable", i18n: "ผัก" },
  { key: "other", i18n: "อื่นๆ" },
  { key: "appetizer", i18n: "ของทานเล่น" },
  { key: "dessert", i18n: "ของหวาน" },
  { key: "drink", i18n: "เครื่องดื่ม" },
] as const;
function Home() {
  const [order, setOrder] = useState([] as Order[]);
  const addToCart = (clickedItem: Order) => {
    setOrder((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const removeFromCart = (id: number) => {
    console.log("ลบ");
    
    setOrder((prev) =>
      prev.reduce((ack, item) => {
        if (parseInt(item.id) === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as Order[])
    );
  };

  useEffect(() => {
    console.log(order);
  }, [order]);

  // ------------ Device conditon--------------------
  const [isMaxWidth767, isMinToMAX, isDisplay] = useMediaQuery([
    "(max-width: 767px)",
    "(min-width: 767px) and (max-width: 1279px)",
    "(min-width: 1279px)",
  ]);

  // --------- API GET DATA ----------------------
  const urlFoods = process.env.NEXT_PUBLIC_GET_FOODS;
  const {
    data: food,
    error,
    isValidating: loading,
  } = useSWR(`${urlFoods}`, fetcher);

  if (error) return <div>failed to load</div>;

  // ----------------------------------------



  return (
    <div className="z-20">
      <Input placeholder="ค้นหา" focusBorderColor="#EC9191" />
      <div className=" w-screen h-screen   grid grid-cols-4  grid-rows-5 fixed sticky-0 left-0 ">
        <div className=" col-span-4 w-screen h-screen flex justify-center rounded-t-lg row-start-4 bg-white  drop-shadow-2xl  mx-auto ">
          <DrawerOrder />
        </div>
      </div>
      <Tabs>
        <TabList>
          <Tab>ทั้งหมด</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {category?.map((cat) => {
              // const { key } = cat;
              return (
                <>
                  <Text fontSize={20} my={5}>
                    {cat.i18n}
                  </Text>
                  <SimpleGrid
                    columns={{ base: 1, sm: 1, md: 1, xl: 3 }}
                    spacing={5}
                  >
                    {food?.[cat.key]?.map((data:InfoFoods, index: number ) => {
                      return (
                        <div key={index}>
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
                                          index={index}
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
                                        index={index}
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
                                      index={index}
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
            {/* {food
                ?.filter((data: InfoFoods) => {
                  return data.category === "pork";
                })
                .map((data: InfoFoods, index: number) => {
                  return (
                    <div key={index}>
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
                        <SimpleGrid columns={{ base: 2, sm: 2, md: 3, xl: 1 }}>
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
                                    index={index}
                                    data={data}
                                    addToCart={addToCart}
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
                                  index={index}
                                  data={data}
                                  addToCart={addToCart}
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
                                index={index}
                                data={data}
                                addToCart={addToCart}
                              />
                            </Box>
                          ) : null}
                        </SimpleGrid>
                      </Box>
                    </div>
                  );
                })} */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Home;
