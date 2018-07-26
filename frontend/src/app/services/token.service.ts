import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login : 'http://users.app/api/auth/login',
    signup: 'http://users.app/api/auth/signup'
  } 

  constructor() { }

  handle(token)
  {
    this.setToken(token);    
  }

  setToken(token)
  {
    localStorage.setItem('token', token);
  }

  getToken()
  {
    return localStorage.getItem('token');
  }

  removeToken()
  {
    return localStorage.removeItem('token');
  }

  isValidToken()
  {   
    const token = this.getToken();

    if( token )
    {
      const payload = this.payload(token);

      if (payload)
      {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }

    return false;
  }

  payload(token)
  {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload)
  {
    return JSON.parse(atob(payload));
  }

  loggedIn()
  {
    return this.isValidToken();
  }
}
