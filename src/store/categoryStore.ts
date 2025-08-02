import { makeAutoObservable } from 'mobx';

class CategoryStore {
  categories = [];
  constructor() {
    makeAutoObservable(this);
  }

  setCategories(categories) {
    this.categories = categories;
  }
}

export const categoryStore = new CategoryStore();