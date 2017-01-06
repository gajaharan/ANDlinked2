import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AngularFireModule} from "angularfire2";
import {firebaseConfig, authConfig} from "../environments/firebase.config";
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileFormComponent} from './profile-form/profile-form.component';
import {HomeComponent} from './home/home.component';
import {routableComponents, AppRoutingModule} from "./app-routing.module";
import {AuthService} from "./shared/services/auth.service";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {UserService} from "./shared/services/user.service";
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { NgDropFilesDirective } from './shared/directives/ng-drop-files.directive';
import {UploadImagesService} from "./shared/services/upload-images.service";
import { NgSelectFilesDirective } from './shared/directives/ng-select-files.directive';

@NgModule({
  declarations: [
    AppComponent,
    routableComponents,
    LoginComponent,
    RegisterComponent,
    ProfileFormComponent,
    HomeComponent,
    NavBarComponent,
    UploadImagesComponent,
    NgDropFilesDirective,
    NgSelectFilesDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
    AppRoutingModule
  ],
  providers: [AuthService, UserService, UploadImagesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
