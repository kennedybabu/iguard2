import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAllPremisesService {

  constructor(private http:HttpClient) { }


  getPremises(userId: any): Observable<any> {
    let jsonObject = {
      "requestObject": {
        "account_id": userId
      },
      "requestService": "GET_PREMISES_RULE"
    }
  return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
