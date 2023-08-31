import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCompanyDetailsService {

  constructor(private http:HttpClient) { }


      getDetails(companyId: number): Observable<any> {
        let jsonObject = {
          "requestObject": {
            "company": companyId
          },
        "requestService": "GET_COMPANY_DETAILS"
      }
      return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
    }
}
