import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCompanySettingsService {

  constructor(private http:HttpClient) { } 

  getSettings(companyId: number): Observable<any> {
    let jsonObject = {
      "requestObject": {
        "company": companyId
      },
      "requestService": "GET_COMPANY_SETTINGS"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
