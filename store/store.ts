import { makeAutoObservable } from "mobx";
import axios from "axios";
import { Order } from "@/models/interfaces/TypesFood";

class Store {
    test:number = 1
    order:Order[] = [] 
    
    constructor() {
        makeAutoObservable(this);
      }

      addOrder(data:Order){
        this.order.push(data)
        // console.log(this.order);
        
      }

}

export const store = new Store()