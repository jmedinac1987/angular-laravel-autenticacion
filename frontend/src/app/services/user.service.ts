import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private server: string;  

  constructor(private _http:HttpClient)
  {
    this.server = 'http://users.app/api/auth';
  }

  loginService(form)
  {
    return this._http.post(`${this.server}/login`, form);
  }

  signupService(form)
  {
    return this._http.post(`${this.server}/signup`, form);
  }

  sendPasswordReset(form)
  {
    return this._http.post(`${this.server}/sendPasswordResetlink`, form);
  }

  changePassword(form)
  {
    return this._http.post(`${this.server}/resetPassword`, form);
  }

}
