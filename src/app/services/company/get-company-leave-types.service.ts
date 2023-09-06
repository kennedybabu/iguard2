import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCompanyLeaveTypesService {

  constructor(private http:HttpClient) { } 

  getLeaveTypes(companyId: number): Observable<any>{

    let jsonObject = {
      "requestObject": {
        "company": companyId      
      },
      "requestService": "GET_ALL_LEAVE_TYPE"  
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
