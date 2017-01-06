import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
  userId:string;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
  }

}
