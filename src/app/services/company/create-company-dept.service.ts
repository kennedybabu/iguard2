import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateCompanyDeptService {

  constructor(private http:HttpClient) { }

  createDepartment(formValue: any, premiseId: number, companyId: number): Observable<any>{

    let jsonObject = {
      "requestObject": {
        "company": companyId,
        "premise":premiseId,
        "department_name": formValue.department_name,
        "narration": formValue.narration
      },
      "requestService": "ADD_COMPANY_DEPARTMENT_RULE"  
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
