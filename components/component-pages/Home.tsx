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
import { InfoFoods, Order, OrderFoods } from "@/models/interfaces/TypesFood";
import ButtonAdd from "../utility/ButtonAdd";
import DrawerOrder from "../utility/DrawerOrder";
import ContentPanel from "../utility/ContentPanel";
import { category } from "@/models/const/category";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function Home() {
  const [searchText, setSearchText] = useState("");
  const [orders, setOrders] = useState([] as Order[]);
  const [isMaxWidth767, isMinToMAX, isDisplay] = useMediaQuery([
    "(max-width: 767px)",
    "(min-width: 767px) and (max-width: 1279px)",
    "(min-width: 1279px)",
  ]);
  const addToCart = (clickedItem: Order) => {
    setOrders((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem?.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const removeFromCart = (id: number) => {
    setOrders((prev) =>
      prev.reduce((ack, item) => {
        if (parseInt(item.id) === id) {
          if (item.amount === 0) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as Order[])
    );
  };

  useEffect(() => {}, [orders]);

  // --------- API GET DATA ----------------------
  const urlFoods = process.env.NEXT_PUBLIC_GET_FOODS;
  const {
    data: food,
    error,
    isValidating: loading,
  } = useSWR<OrderFoods, any, string>(`${urlFoods}`, fetcher);

  function genAmount() {
    setOrders([] as Order[]);
    for (const data of category) {
      for (const dataF of food?.[data?.key]!) {
        const dataf = { ...dataF, amount: 0 };
        setOrders((prev) => {
          return [...prev, dataf];
        });
      }
    }
  }

  useEffect(() => {
    if (!food) return;
    genAmount();
  }, [food]);
  if (error) return <div>failed to load</div>;

  // ----------------------------------------

  const totalOrder = orders.reduce((prev, cur) => Number(cur.amount) + prev, 0);

  return (
    <div className=" z-20">
      <Input
        placeholder="ค้นหา"
        focusBorderColor="#EC9191"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      {isMaxWidth767 || isMinToMAX ? (
        <div className=" w-screen h-[100px] z-30  grid grid-cols-4  grid-rows-1 fixed bottom-0 sticky-0 left-0 ">
          <div className=" col-span-4 w-screen h-screen flex justify-center rounded-t-lg row-start-4 bg-white  drop-shadow-2xl  mx-auto ">
            <DrawerOrder
              clearAmount={genAmount}
              totalOrder={totalOrder}
              orders={orders}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          </div>
        </div>
      ) : isDisplay ? (
        <div className=" w-screen h-[100px] z-30  grid grid-cols-4  grid-rows-1 fixed bottom-0 sticky-0 left-0 ">
          <div className="col-start-4 flex justify-end mr-10">
            <DrawerOrder
              isDisplay
              clearAmount={genAmount}
              totalOrder={totalOrder}
              orders={orders}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          </div>
        </div>
      ) : (
        <div className=" w-screen h-[100px] z-30  grid grid-cols-4  grid-rows-1 fixed bottom-0 sticky-0 left-0 ">
          <div className=" col-span-4 w-screen h-screen flex justify-center rounded-t-lg row-start-4 bg-white  drop-shadow-2xl  mx-auto ">
            <DrawerOrder
              clearAmount={genAmount}
              totalOrder={totalOrder}
              orders={orders}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          </div>
        </div>
      )}
      <Tabs isFitted={isDisplay ? true : false}>
        <SimpleGrid columns={1} spacing={2}>
          <TabList
            overflowX={{
              base: "auto",
              sm: "auto",
              md: "auto",
              lg: "hidden",
            }}
            my="20px"
            overflowY="hidden"
            display={{
              base: "inline-",
              sm: "inline-",
              md: "inline-",
              lg: "inline-",
              xl: "flex",
            }}
            width={"100%"}
          >
            <Tab>
              <Text
                fontSize={{
                  base: "md",
                  sm: "md",
                  md: "md",
                  lg: "md",
                  xl: "lg",
                }}
              >
                ทั้งหมด
              </Text>
            </Tab>
            {category.map((cat, index: number) => {
              return (
                <Tab key={index}>
                  <Text
                    fontSize={{
                      base: "md",
                      sm: "md",
                      md: "md",
                      lg: "md",
                      xl: "lg",
                    }}
                  >
                    {cat.i18n}
                  </Text>
                </Tab>
              );
            })}
          </TabList>
        </SimpleGrid>

        <TabPanels>
          <TabPanel>
            <ContentPanel
              food={food}
              orders={orders}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              type={"all"}
              searchText = {searchText}
            />
          </TabPanel>
          {category.map((cat, index: number) => {
            return (
              <TabPanel key={index}>
                <ContentPanel
                  food={food}
                  orders={orders}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  type={cat.key}
                  searchText = {searchText}
                  
                />
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Home;
