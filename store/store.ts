import { makeAutoObservable } from "mobx";
import axios from "axios";
import { Order } from "@/models/interfaces/TypesFood";
import { OrderedList } from "@chakra-ui/react";

class Store {
    
    order:Order[][] = [] 
  

    constructor() {
        makeAutoObservable(this);
      }

      addOrder(data:Order[]){
        this.order.push(data)
        
        
      }

}

export const store = new Store()