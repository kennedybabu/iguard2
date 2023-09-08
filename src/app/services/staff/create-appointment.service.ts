import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateAppointmentService {

  constructor(private http:HttpClient) { }

  createAppointment(formvalue: any,staffId: number, departmentId: number): Observable<any>{   
    let time = formvalue.appointment_start
    let convertedTime = new Date(time).getTime() 
    let timeInSecs = Math.floor(convertedTime)


    let jsonObject = {
      "requestObject": { 
        "department_id": departmentId,
        "created_by" : staffId,
        "visitor_name":formvalue.visitor_name,
        "msisdn": formvalue.msisdn,
        "email":formvalue.email,
        "narration": formvalue.narration,
        "appointment_start": timeInSecs,
        "duration": formvalue.duration,
        "repeat_mode": formvalue.repeat_mode
      },
      "requestService": "CREATE_APPOINTMENT_RULE"  
    }

    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
