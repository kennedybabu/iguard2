import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetShiftDetailsService {

  constructor(private http:HttpClient) { } 

  getDetails(shiftId: number): Observable<any> {

    let jsonObject = {
      "requestObject": {
        "shift": shiftId
      },
    "requestService": "CHECK_OUT_STAFF_RULE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
