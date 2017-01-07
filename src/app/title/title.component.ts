import {Component, OnInit, Input} from '@angular/core';
import {User} from "../shared/models/user";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Input() userId:string;
  @Input() title:string;
  user: User;
  isEditMode: boolean = false;
  finishEditing: boolean = false;
  temp: User;

  constructor(private _userService: UserService) {
    this.user = new User();
  }

  ngOnInit() {
    this._userService.findUserbyUid(this.userId)
      .subscribe(
        user => this.user = user
      );
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    this.finishEditing = false;
    this.temp = this.user;
    console.log('1' + this.temp.role);
  }

  save() {

    this._userService.saveUser(this.user.$key, this.user)
      .subscribe(
        () => {
          alert("user saved succesfully.");
          this.isEditMode = false;
          this.finishEditing = true;
        },
        err => alert(`error saving lesson ${err}`)
      );

  }

  cancel(): void {
    this.user = this.temp;
    this.isEditMode = !this.isEditMode;
    this.finishEditing = true;
  }

  getPlaceHolder(): string {
    return 'Enter your ' + this.title;
  }



}
