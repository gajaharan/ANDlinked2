
import {AuthProviders, AuthMethods} from "angularfire2";

export const firebaseConfig = {
  apiKey: "AIzaSyAxdeAaj7EgOGxAO4FjnOkz79sloECI52k",
  authDomain: "andlinked.firebaseapp.com",
  databaseURL: "https://andlinked.firebaseio.com",
  storageBucket: "andlinked.appspot.com",
  messagingSenderId: "1014735566214"
};



export const authConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};
