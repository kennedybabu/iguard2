import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetPremiseAttendanceService {

  constructor(private http:HttpClient) { } 

  getAttendance(id: any): Observable<any> {
    let jsonObject = {
      "requestObject": {
        "premise": id
      },
      "requestService": "GET_PREMISE_ATTENDANCE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
