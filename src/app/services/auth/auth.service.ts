import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router:Router) { }

  login(formvalue:any): Observable<any> {
    let jsonObject = {
      "requestObject": {
        "username": formvalue.username, 
        "password": formvalue.password
     }, 
      "requestService": "AUTHENTICATION"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/adminAuthentication', jsonObject)
}

}


