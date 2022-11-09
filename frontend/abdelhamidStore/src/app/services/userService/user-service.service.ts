import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  
  constructor(private _http:HttpClient) { 
  }

  //change here
  dbUserUrl = 'http://192.168.1.2:3000/users'

  
  getUserLog():Observable<any>
  {
    let token = ({
      'token':localStorage.getItem('token')
    })
    
    return this._http.post(`${this.dbUserUrl}/getLogInfo`,token);  
    
  }

  logIn(data:any):Observable<any>
  {
    return this._http.post(`${this.dbUserUrl}/logIn`,data);
  }

  signUp(data:any):Observable<any>
  {
    return this._http.post(`${this.dbUserUrl}/signUp`,data)
  }

  sendMessage(data:any):Observable<any>{
    return this._http.post(`${this.dbUserUrl}/sendMessage`,data)
  }
  
}

