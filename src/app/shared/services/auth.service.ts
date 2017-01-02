import {Injectable, Inject} from '@angular/core';
import {Observable, Subject, BehaviorSubject} from "rxjs/Rx";
import {FirebaseAuth, FirebaseAuthState, FirebaseRef, AngularFireModule, AngularFireDatabase} from "angularfire2/index";
import {AuthInfo} from "./auth-info";
import {Router} from "@angular/router";
import {User} from "../models/user";
import {UserService} from "./user.service";

@Injectable()
export class AuthService {

  static UNKNOWN_USER = new AuthInfo(null);
  user: User;
  user$: Observable<User> = Observable.empty<User>();

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  constructor(private auth: FirebaseAuth,
              private router: Router) {

  }


  login(email, password): Observable<FirebaseAuthState> {
    return this.fromFirebaseAuthPromise(this.auth.login({email, password}));
  }


  register(email, password): Observable<FirebaseAuthState> {
    return this.fromFirebaseAuthPromise(this.auth.createUser({email, password}))
      .do(val => console.log("register", val));
  }



  fromFirebaseAuthPromise(promise): Observable<any> {

    const subject = new Subject<any>();

    promise
      .then(res => {
          const authInfo = new AuthInfo(this.auth.getAuth().uid);
          this.authInfo$.next(authInfo);
          subject.next(res);
          subject.complete();
          //this.user$ = this.userService.findUserbyUid(authInfo.getUid());
          //this.findUserbyUid(authInfo.getUid())
        },
        err => {
          this.authInfo$.error(err);
          subject.error(err);
          subject.complete();
        })

    return subject.asObservable();
  }

  /*private findUserbyUid(authId: string) {
    this.userService.findUserbyUid(authId)
      .subscribe(user => this.user = user);
  }*/


  logout() {
    this.auth.logout();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
    this.router.navigate(['/login']);


  }

  getCurrentLoggedUser() {
    return this.user;
  }

}
