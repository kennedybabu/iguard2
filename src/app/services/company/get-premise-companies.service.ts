import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetPremiseCompaniesService {

  constructor(private http:HttpClient) { }

  getCompanies(premiseId: number): Observable<any> {

    let jsonObject = {
      "requestObject": {
        "premise": premiseId
      },
    "requestService": "GET_PREMISE_COMPANIES_RULE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
