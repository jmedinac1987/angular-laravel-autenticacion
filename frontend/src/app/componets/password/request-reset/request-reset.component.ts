import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { SnotifyService } from 'ng-snotify';



@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public form = {
    email: null
  } 
  
  public error = null;

  constructor(
    private userService: UserService, private notify: SnotifyService
  )
  { }

  ngOnInit() {
  }

  onSubmit()
  { 
    this.notify.info('Procesando la solicitud...', {timeout: 1000});    
    this.userService.sendPasswordReset(this.form).subscribe(
      data => this.handleResponse(data),              
      error => this.handleError(error));
  }

  handleError(error)
  { 
    if (error.status === 0) {
      this.notify.error('Lo sentimos en este momento no podemos procesar su solicitud', {timeout:0});  
    }else{
      this.error = error.error.error;
    }
  }
  
  

  handleResponse(response)
  { 
    this.error = null;
    this.notify.success(response.data, {timeout:0});    
    console.log(response);
    this.form.email = null;
  }


}
