import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  }

  public error = [];

  constructor(
    private userService: UserService, private tokenService: TokenService, 
    private router:Router, private authService: AuthService, private notify: SnotifyService)
  {

  }

  ngOnInit()
  {

  }

  onSubmit()
  {
    this.userService.signupService(this.form).subscribe(
      data => this.handleResponse(data)
     ,error => this.handleError(error));
  }

  handleError(error)
  { 
    if (error.status === 0) {
      this.notify.error('Lo sentimos en este momento no podemos procesar su solicitud', {timeout:0});  
    }else{
      this.error = error.error.errors;
    }
    
  }

  handleResponse(data)
  { 
    this.error = [];
    this.tokenService.handle(data.access_token);
    this.authService.changeAuthStatus(true);
    this.router.navigate(['/profile']);
  }
}
