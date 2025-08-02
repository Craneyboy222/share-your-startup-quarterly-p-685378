import { makeAutoObservable } from 'mobx';

class UserStore {
  users = [];
  constructor() {
    makeAutoObservable(this);
  }

  setUsers(users) {
    this.users = users;
  }
}

export const userStore = new UserStore();