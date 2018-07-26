import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { ProfileComponent } from './componets/profile/profile.component';
import { SignupComponent } from './componets/signup/signup.component';
import { RequestResetComponent } from './componets/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './componets/password/response-reset/response-reset.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';

const appRoutes: Routes = [
  {path:'', redirectTo: '/login', pathMatch:'full'},
  { path:'login', component: LoginComponent, canActivate: [BeforeLoginService]},
  { path:'profile', component: ProfileComponent, canActivate: [AfterLoginService]},
  { path:'signup', component: SignupComponent, canActivate: [BeforeLoginService]},
  { path:'request-password-reset', component: RequestResetComponent, canActivate: [BeforeLoginService]},
  { path:'response-password-reset', component: ResponseResetComponent, canActivate: [BeforeLoginService]}
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
