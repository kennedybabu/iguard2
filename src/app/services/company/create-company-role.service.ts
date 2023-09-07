import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateCompanyRoleService {

  constructor(private http:HttpClient) { } 

  addRole(formValue: any, companyId: number): Observable<any>{   
    let jsonObject = {
      "requestObject": {    
        "name": formValue.name,
        "description": formValue.description,
        "department": formValue.department,
        'company': companyId
     
      },
      "requestService": "ADD_COMPANY_DESIGNATION_RULE"  
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
