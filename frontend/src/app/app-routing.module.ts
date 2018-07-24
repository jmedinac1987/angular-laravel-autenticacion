import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { ProfileComponent } from './componets/profile/profile.component';
import { SignupComponent } from './componets/signup/signup.component';
import { RequestResetComponent } from './componets/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './componets/password/response-reset/response-reset.component';

const appRoutes: Routes = [
  {path:'', redirectTo: '/login', pathMatch:'full'},
  { path:'login', component: LoginComponent},
  { path:'profile', component: ProfileComponent},
  { path:'signup', component: SignupComponent},
  { path:'request-password-reset', component: RequestResetComponent},
  { path:'response-password-reset', component: ResponseResetComponent}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
