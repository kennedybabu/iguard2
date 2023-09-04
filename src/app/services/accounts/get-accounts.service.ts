import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAccountsService {

  constructor(private http:HttpClient) { } 

  getAccounts(): Observable<any> {
    let jsonObject = {
      "requestObject": {
   
      },
      "requestService": "GET_ALL_ACCOUNTS"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
