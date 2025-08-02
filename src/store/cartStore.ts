import { makeAutoObservable } from 'mobx';

class CartStore {
  cartItems = [];
  constructor() {
    makeAutoObservable(this);
  }

  addToCart(item) {
    this.cartItems.push(item);
  }

  removeFromCart(itemId) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }
}

export const cartStore = new CartStore();