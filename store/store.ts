import { OrderFoods } from "./../models/interfaces/TypesFood";
import { category } from "@/models/const/category";
import { makeAutoObservable } from "mobx";
import { Order } from "@/models/interfaces/TypesFood";

class Store {
  order: Order[][] = [];
  historyShow: Order[][] = [];
  orderInCart: Order[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addOrder(data: Order[]) {
    this.order.push(data);
    this.historyShow = this.order.reverse();
  }

  // genAmount(food: OrderFoods) {
  //   this.orderInCart = [];
  //   for (const data of category) {
  //     for (const dataF of food?.[data?.key]!) {
  //       const dataf = { ...dataF, amount: 0 };
  //       this.orderInCart = [...this.orderInCart, dataf];
  //     }
  //   }
  // }

  // addToCart(clickedItem: Order) {
  //   const isItemInCart = this.orderInCart.find(
  //     (item) => item.id === clickedItem.id
  //   );
  //   if (isItemInCart) {
  //     return this.orderInCart.map((item, index) => {
  //       if (item.id === clickedItem?.id) {
  //         return (this.orderInCart[index] = {
  //           ...item,
  //           amount: item.amount + 1,
  //         });
  //       } else {
  //         return (this.orderInCart[index] = item);
  //       }
  //     });
  //   }
  //   this.orderInCart = [...this.orderInCart, { ...clickedItem, amount: 1 }];
  // }

  // removeFromCart(id: number) {
  //   this.orderInCart.reduce((ack, item) => {
  //     if (parseInt(item.id) === id) {
  //       if (item.amount === 0) return ack;
  //       return (this.orderInCart = [
  //         ...ack,
  //         { ...item, amount: item.amount - 1 },
  //       ]);
  //     } else {
  //       return (this.orderInCart = [...ack, item]);
  //     }
  //   }, [] as Order[]);
  // }
}

export const store = new Store();
