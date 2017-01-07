import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2";
import {Observable, Subject} from "rxjs/Rx";
import {User} from "../models/user";
import * as firebase from 'firebase';

@Injectable()
export class UserService {
  sdkDb: any;

  constructor(private _angularFireDatabase: AngularFireDatabase) {
    this.sdkDb = firebase.database().ref().child('users');
  }

  findAllUsers(): Observable<User[]> {
    return this._angularFireDatabase.list('users').map(User.fromJsonArray);
  }


  findUserbyUid($uid: string): Observable<User> {
    return this._angularFireDatabase.list('users', {
      query: {
        orderByChild: 'regUser',
        equalTo: $uid
      }
    })
      .filter(results => results && results.length > 0)
      .map(results => User.fromJson(results[0]))
      .do(console.log);
  }

  registerd(uid, firstname, lastname, email): Observable<any> {
    return this.registerDetails(uid, firstname, lastname, email)
      //.do(val => console.log("registerd", val));
  }

  registerDetails(uid, firstname, lastname, email) {
    const subject = new Subject();

    this.sdkDb.child(uid).set({
      date: firebase.database['ServerValue']['TIMESTAMP'],
      regUser: uid,
      firstname: firstname,
      lastname: lastname,
      email: email
    })
      .then(
        val => {
          subject.next(val);
          subject.complete();

        },
        err => {
          subject.error(err);
          subject.complete();
        }
      );

    return subject.asObservable();
  }

  saveUser(userId:string, user): Observable<any> {

    const userToSave = Object.assign({}, user);
    delete(userToSave.$key);

    let dataToSave = {};
    dataToSave[`${userId}`] = userToSave ;

    return this.firebaseUpdate(dataToSave);


  }

  firebaseUpdate(dataToSave) {
    const subject = new Subject();

    this.sdkDb.update(dataToSave)
      .then(
        val => {
          subject.next(val);
          subject.complete();

        },
        err => {
          subject.error(err);
          subject.complete();
        }
      );

    return subject.asObservable();
  }
}

