import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatePremiseAdminService {

  constructor(private http:HttpClient) { } 

  createAdmin(formValue: any, premiseId: number, accountId: number): Observable<any>{   
    let jsonObject = {
      "requestObject": {
        "first_name": formValue.first_name,
        "last_name": formValue.last_name,
        "middle_name": formValue.middle_name,
        "account": accountId,
        "emailAddress": formValue.emailAddress,
        "msisdn": formValue.msisdn,
        "username": formValue.username,
        "premise": +premiseId
      },
      "requestService": "CREATE_ACCOUNT_ADMIN"  
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
