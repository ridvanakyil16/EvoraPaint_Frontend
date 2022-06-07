import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../models/global';
import { LoginModel } from '../models/loginModel';
import { ObjectResponseModel } from '../models/objectResponseModel';
import { TokenModel } from '../models/tokenModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = GlobalVariable.BASE_URL;

  public userIsAdmin = new BehaviorSubject<boolean>(false);

  constructor(private httpClient:HttpClient) { }

  setUserIsAdmin(val: boolean) {
    this.userIsAdmin.next(val);
  }

  getUserIsAdmin(): Observable<boolean> {
    return this.userIsAdmin.asObservable();
  }

  login(user:LoginModel){
    return this.httpClient.post<ObjectResponseModel<TokenModel>>(this.apiUrl + "api/auth/login" ,user)
  }

  isAuthenticated(){
    if(localStorage.getItem("Token"))
    {
      return true;
    }
    else{
      return false;
    }
  }
}
