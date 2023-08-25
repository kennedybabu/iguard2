import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  userData$: Observable<any> = this.userDataSubject.asObservable()

  constructor(private http:HttpClient,private router:Router) { 
    if(localStorage.getItem('ulpSaH5wx1pO!E')) {
      const user = (<string>localStorage.getItem('ulpSaH5wx1pO!E'))
      this.userDataSubject.next(user)
    }
  }

  login(formvalue:any): Observable<any> {
    let jsonObject = {
      "requestObject": {
        "username": formvalue.username, 
        "password": formvalue.password
     }, 
      "requestService": "AUTHENTICATION"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/adminAuthentication', jsonObject).pipe(
      map((response:any) => {
        console.log(response)
          let userObject = 
          {
            'user': response.message.user, 
            'permissions': response.message.permissions,
            'token': response.message.accessToken, 
            'accountId': response.message.accountId, 
            'userId': response.message.userId
          }
          
          this.userDataSubject.next(userObject)  
          localStorage.setItem('ulpSaH5wx1pO!E', JSON.stringify(userObject))
          return response
      })
    )
  }

  get userData(){
    return this.userDataSubject.value
  }


  logout(){
    localStorage.removeItem('ulpSaH5wx1pO!E')
  }

}


