import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCompanyShiftStaffService {

  constructor(private http:HttpClient) { } 

  getStaff(premiseShift: number): Observable<any> {
    let jsonObject = {
      "requestObject": {
        "premise_shift": premiseShift
      },
    "requestService": "GET_STAFF_PREMISES_SHIFT_DETAILS"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
