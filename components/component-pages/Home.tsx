import React, { useEffect, useState } from "react";
import {
  Input,
  SimpleGrid,
  SkeletonText,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";
import { Order, OrderFoods } from "@/models/interfaces/TypesFood";

import DrawerOrder from "../utility/DrawerOrder";
import ContentPanel from "../utility/ContentPanel";
import { category } from "@/models/const/category";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

type Props = {
  loading: boolean;
};

function Home({ loading: load }: Props) {
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
    <div className=" z-10 mt-24 bg-white h-full min-h-screen">
      <div className="fixed w-screen left-0 right-0 z-20 bg-white">
        <div className="mx-3 sm:mx-3 md:mx-12 lg:mx-12 xl:mx-36">
          <div className="relative ">
            <Input
              placeholder="ค้นหาเมนูอาหาร"
              focusBorderColor="#EC9191"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-[#D52D2C] dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {isMaxWidth767 || isMinToMAX ? (
        <div className=" w-screen h-[100px] z-30  grid grid-cols-4  grid-rows-1 fixed bottom-0 sticky-0 left-0 ">
          <div className=" col-span-4  w-screen h-screen flex justify-center rounded-t-lg row-start-4 bg-white  drop-shadow-2xl  mx-auto  ">
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
        <div className=" w-screen h-[150px] z-30  grid grid-cols-4   grid-rows-1 fixed bottom-0 sticky-0 left-0 ">
          <div className="col-start-4 flex justify-end mr-7">
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
      <Tabs>
        <SimpleGrid columns={1} spacing={2} backgroundColor={"white"}>
          <TabList
            backgroundColor={"white"}
            zIndex={"20"}
            position={"fixed"}
            overflowX={{
              base: "auto",
              sm: "auto",
              md: "auto",
              lg: "hidden",
            }}
            my={{
              base: "50px",
              sm: "50px",
              md: "50px",
              lg: "50px",
              xl: "50px",
            }}
            overflowY="hidden"
            display={{
              base: "inline-",
              sm: "inline-",
              md: "inline-",
              lg: "inline-",
              xl: "inline-flex",
            }}
            width={{
              base: "100%",
              sm: "100%",
              md: "87%",
              lg: "90%",
              xl: "83%",
              "2xl": "86%",
            }}
          >
            <Tab>
              <SkeletonText noOfLines={1} spacing="2" isLoaded={!load}>
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
              </SkeletonText>
            </Tab>
            {category.map((cat, index: number) => {
              return (
                <Tab key={index}>
                  <SkeletonText noOfLines={1} spacing="2" isLoaded={!load}>
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
                  </SkeletonText>
                </Tab>
              );
            })}
          </TabList>
        </SimpleGrid>

        <TabPanels>
          <TabPanel>
            <ContentPanel
              load={load}
              food={food}
              orders={orders}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              type={"all"}
              searchText={searchText}
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
                  searchText={searchText}
                  load={load}
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
