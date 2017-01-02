import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileFormComponent} from "./profile-form/profile-form.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: 'profile/:id',
    children: [
      {
        path: 'edit',
        component:  ProfileFormComponent,
      },
      {
        path: '',
        component: ProfileFormComponent,
      }
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}

export const routableComponents = [
  AppComponent,
  HomeComponent,
  LoginComponent,
  RegisterComponent
]
