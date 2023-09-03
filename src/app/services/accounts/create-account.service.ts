import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

  constructor(private http:HttpClient) { } 

  createAccount(formValue:any): Observable<any> {

    let jsonObject = {
      "requestObject": {
        "accountName": formValue.accountName,
        "location": formValue.location,
        "emailAddress": formValue.emailAddress,
        "msisdn": formValue.msisdn,
        "description": formValue.description,
        "username": formValue.username,
        "password": formValue.password
      },
      "requestService": "CREATE_ACCOUNT"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
