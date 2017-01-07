import {Component, OnInit, Input} from '@angular/core';
import {User} from "../shared/models/user";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() userId:string;
  user: User;

  constructor(private _userService: UserService) {
    this.user = new User();
  }

  ngOnInit() {
    console.log(this.userId)
    this._userService.findUserbyUid(this.userId)
      .subscribe(
        user => this.user = user
      );
  }

}
