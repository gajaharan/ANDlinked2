export class AuthInfo {

  constructor(public $uid: string) {
  }

  isLoggedIn() {
    return !!this.$uid;
  }

  getUid() {
    return this.$uid;
  }

  getUser() {

  }
}
