import { makeAutoObservable } from 'mobx';

class ProductStore {
  products = [];
  constructor() {
    makeAutoObservable(this);
  }

  setProducts(products) {
    this.products = products;
  }
}

export const productStore = new ProductStore();