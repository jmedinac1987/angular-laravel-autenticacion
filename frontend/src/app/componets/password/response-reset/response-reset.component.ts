import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null,
    resetToken : null
  }

  public errors = [];
  public error = null;
  public confirmErrors = false;

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService, 
    private router:Router,
    private notify: SnotifyService) 
  { }

  ngOnInit()
  {
    this.route.queryParams.subscribe(params => this.form.resetToken = params['token']);
  }

  onSubmit()
  {
    this.userService.changePassword(this.form).subscribe(
      data => this.handleResponse(data)                           
      ,error => this.handleError(error));    
  }

  handleError(error)
  {    
    
    if(error.error.errors){
      this.errors = error.error.errors;
    }else{
      this.error = error.error.error;
    }
    
  }

  handleResponse(data)
  { 
    this.error = null;
    this.errors = [];
    
    let _router = this.router;
    
    this.notify.confirm('Perfecto!, ahora inicia sesión con la nueva contraseña',
    {
      buttons:[
        {
         text: 'OK',
         action: toster =>{
                            _router.navigate(['/login']);
                            this.notify.remove(toster.id);
                          }
        }
      ]
    });
    
  }

}
