import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeAppointmentStatusService {

  constructor(private http:HttpClient) { }

  changeStatus(id: number, status:string, accountId: number): Observable<any> {
    let jsonObject = {
      "requestObject": {
        "appointment": id,
        "user": accountId,
        "status": status   
      },
      "requestService": "CHANGE_APPOINTMENT_STATUS_RULE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
