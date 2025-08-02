import { makeAutoObservable } from 'mobx';

class OrderStore {
  orders = [];
  constructor() {
    makeAutoObservable(this);
  }

  setOrders(orders) {
    this.orders = orders;
  }
}

export const orderStore = new OrderStore();