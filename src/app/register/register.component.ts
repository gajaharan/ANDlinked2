import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {UserService} from "../shared/services/user.service";
import {FirebaseAuthState} from "angularfire2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  fbAuthState: FirebaseAuthState;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private userService: UserService) {

    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });


  }

  isPasswordMatch() {
    const val = this.form.value;
    return val && val.password && val.password == val.confirm;
  }

  signUp() {
    const val = this.form.value;

    this.authService.register(val.email, val.password)
      .subscribe(
        fbAuthState => this.fbAuthState = fbAuthState,
        null,
        () => {
          //alert('User created successfully !');
          this.register(this.fbAuthState.uid, val.firstname, val.lastname, val.email);
        }
      );
  }

  register(uid, firstname, lastname, email) {
    this.userService.registerd(uid, firstname, lastname, email)
      .subscribe(
        () => {
          alert("lesson created succesfully. Create another lesson ?");
          this.router.navigate(['/profile', this.fbAuthState.uid]);
        },
        err => alert(`error creating lesson ${err}`)
      );
  }


}
