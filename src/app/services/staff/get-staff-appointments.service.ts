import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetStaffAppointmentsService {

  constructor(private http:HttpClient) { } 

  getUserAppointments(id:any): Observable<any> {
    let jsonObject = {
      "requestObject":{
        "userId": id
        },
        "requestService":"GET_APPOINTMENT_BY_USER_ID"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
