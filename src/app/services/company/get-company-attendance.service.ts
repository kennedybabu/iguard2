import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCompanyAttendanceService {

  constructor(private http:HttpClient) { }

  getAttendance(id:any): Observable<any> {
    let jsonObject = {
      "requestObject":{
        "company": id
        },
        "requestService":"GET_COMPANY_ATTENDANCE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
