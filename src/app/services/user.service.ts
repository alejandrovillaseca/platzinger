import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  friends: User[]
  constructor(private angularFireDatabase: AngularFireDatabase) { }

  getUsers() {
    return this.angularFireDatabase.list('/users') //Nodo usuarios creado en Firebase --> Esto es un Observable, que notifican a la App cada vez que exista un cambio.
  }
  getUserById(uid) {
    return this.angularFireDatabase.object('/users/' + uid)
  }
  getFriends() {
    return this.friends;
  }
  createUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }
  editUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }
  setAvatar(avatar, uid) {
    return this.angularFireDatabase.object('/users/' + uid + '/avatar').set(avatar)
  }
  addFriend(userId, friendId) {
    this.angularFireDatabase.object('users/' + userId + '/friends/' + friendId).set(friendId)
    return this.angularFireDatabase.object('users/' + friendId + '/friends/' + userId).set(userId) //Promesa
  }
}
