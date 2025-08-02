import { makeAutoObservable } from 'mobx';

class AuthStore {
  user = null;
  constructor() {
    makeAutoObservable(this);
  }

  setUser(user) {
    this.user = user;
  }

  clearUser() {
    this.user = null;
  }
}

export const authStore = new AuthStore();