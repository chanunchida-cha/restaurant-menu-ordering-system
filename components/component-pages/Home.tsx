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
  const [orders, setOrders] = useState([] as Order[]);
  const order = orders?.map((item) => item);
  const [value, setValue] = useState(0);
  const addToCart = (clickedItem: Order) => {
    setOrders((prev) => {
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

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  // --------- API GET DATA ----------------------
  const urlFoods = process.env.NEXT_PUBLIC_GET_FOODS;
  const {
    data: food,
    error,
    isValidating: loading,
  } = useSWR<OrderFoods, any, string>(`${urlFoods}`, fetcher);

  function newData() {
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
    newData();
  }, [food]);
  if (error) return <div>failed to load</div>;

  // ----------------------------------------

  const totalOrder = orders.reduce((prev, cur) => Number(cur.amount) + prev, 0);

  return (
    <div className="z-20">
      <Input placeholder="ค้นหา" focusBorderColor="#EC9191" />
      <div className=" w-screen h-[100px] z-50  grid grid-cols-4  grid-rows-1 fixed bottom-0 sticky-0 left-0 ">
        <div className=" col-span-4 w-screen h-screen flex justify-center rounded-t-lg row-start-4 bg-white  drop-shadow-2xl  mx-auto ">
          <DrawerOrder
            totalOrder={totalOrder}
            orders={orders}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            value={value}
            setValue={setValue}
          />
        </div>
      </div>
      <Tabs>
        <TabList>
          <Tab>ทั้งหมด</Tab>
          {category.map((cat, index: number) => {
            return <Tab key={index}>{cat.i18n}</Tab>;
          })}
        </TabList>

        <TabPanels>
          <TabPanel>
            <ContentPanel
              food={food}
              order={order}
              orders={orders}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              type={"all"}
            />
          </TabPanel>
          {category.map((cat, index: number) => {
            return (
              <TabPanel key={index}>
                {" "}
                <ContentPanel
                  food={food}
                  order={order}
                  orders={orders}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  type={cat.key}
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
