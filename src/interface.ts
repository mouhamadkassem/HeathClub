export interface Product {
  _id: number;
  imgUrl: string;
  title: string;
  desc: string;
  price: number;
  // category: string;
}

interface Item extends Product {
  quantity: number;
}

export interface User {
  _id: number;
  subscribe: any;
  firstname: string;
  lastname: string;
  email: string;
  password: number;
  carts: [number];
  cart: [Item];
  classes: [
    {
      class: String;
      day: Number;
      lastDoneDate: Number;
    }
  ];
}

export interface Tasks {
  day: number;
  done: boolean;
  exercises: [
    {
      number: number;
      practice: string;
    }
  ];
  calories: number;
}

export interface Classes {
  id: number;
  part: string;
  tasks: [Tasks];
  desc: string;
  imgUrl: string;
}
