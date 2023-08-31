import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetPremiseBeaconsService {

  constructor(private http:HttpClient) { }

  getPremiseBeacons(id:any): Observable<any> {
    let jsonObject = {
      "requestObject":{
        "premise": id
        },
        "requestService":"GET_BEACONS_RULE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
