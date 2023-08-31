import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCompanyDesignationsService {

  constructor(private http:HttpClient) { }

  getDesignations(companyId: number): Observable<any> {
      let jsonObject = {
        "requestObject": {
          "company": companyId
        },
      "requestService": "GET_ALL_COMPANY_DESIGNATION"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
