import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
     email    : null,
     password : null
  }

  public error = null;

  constructor(
    private userService: UserService, private tokenService: TokenService, 
    private router:Router, private authService: AuthService, private notify: SnotifyService) 
  { }

  ngOnInit() 
  {

  }

  
  onSubmit()
  { 
    this.userService.loginService(this.form).subscribe(
       data => this.handleResponse(data)
      ,error => this.handleError(error));
    
  }

  handleError(error)
  { 
    if (error.status === 0) {
      this.notify.error('Lo sentimos en este momento no podemos procesar su solicitud', {timeout:0});  
    }else{
      this.error = error.error.error;
    }    
  }

  handleResponse(data)
  { 
    this.error = null;
    this.tokenService.handle(data.access_token);
    this.authService.changeAuthStatus(true);
    this.router.navigate(['/profile']);
  }

}
