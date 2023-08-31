import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCompanyShiftsService {

  constructor(private http:HttpClient) { } 


  getShifts(companyId: number): Observable<any> {
        let jsonObject = {
          "requestObject": {
            "company": companyId
          },
        "requestService": "GET_ALL_COMPANY_STAFF_SHIFT"
      }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
