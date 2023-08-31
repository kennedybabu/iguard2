import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateCompanyStaffService {

  constructor(private http:HttpClient) { } 
  createStaff(formValue: any, accountId: number, premiseId: number, companyId: number): Observable<any>{


    let jsonObject = {
      "requestObject": {
        "first_name": formValue.first_name,
        "last_name": formValue.last_name,
        "middle_name": formValue.middle_name,
        "account": accountId,
        "emailAddress": formValue.emailAddress,
        "msisdn": formValue.msisdn,
        "username": formValue.username,
        "premise": premiseId,
        "department": formValue.department.depertment_id,
        "company": companyId,
        "designation": formValue.designation.id

      },
      "requestService": "CREATE_STAFF_RULE"  
    }

    console.log(jsonObject)
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
