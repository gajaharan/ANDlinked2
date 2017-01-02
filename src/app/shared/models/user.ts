export class User {

  constructor(public $key: string,
              public date: string,
              public email: string,
              public firstname: string,
              public lastname: string,
              public regUser: string) {
  }


  static fromJsonArray(array): User[] {
    return array.map(User.fromJson);
  }

  static fromJson({
    $key, date, email, firstname, lastname, regUser
  }): User {
    return new User(
      $key,
      date,
      email,
      firstname,
      lastname,
      regUser);
  }

}
