import {Component, OnInit, OnChanges} from '@angular/core';
import {AuthInfo} from "../shared/services/auth-info";
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/models/user";

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnChanges {

  authInfo: AuthInfo;
  user: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);

  }

  ngOnChanges() {
    this.authService.user$.subscribe(user => this.user = user);
  }

  getCurrentLoggedUser() {
    this.authService.getCurrentLoggedUser();
  }


  logout() {
    this.authService.logout();
  }

}
