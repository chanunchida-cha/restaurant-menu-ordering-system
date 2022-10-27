export interface InfoFoods {
  id: string;
  i18n: string;
  src: string;
  category: string;
}

export interface Order extends InfoFoods {
  amount: number;
}

export interface OrderFoods {
  [key: string]: InfoFoods[];
}
