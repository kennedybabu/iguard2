import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateCompanyLeaveService {

  constructor(private http:HttpClient) { } 

  createLeave(formValue: any, userId: number, companyId: number): Observable<any>{

    let jsonObject = {
      "requestObject": {
        "name": formValue.name,
        "description":formValue.description,
        "company": companyId,
        "created_by": userId
      },
      "requestService": "CREATE_LEAVE_TYPE"  
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
