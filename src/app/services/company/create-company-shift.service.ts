import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateCompanyShiftService {

  constructor(private http:HttpClient) { } 

  createStaffShift(formValue: any, premiseId: number, selectedDays: any[], compandyId: number): Observable<any>{
    let start = formValue.start 
    let end = formValue.end 

    let startTime = new Date(start).getTime() 
    let endTime = new Date(end).getTime()  

    let startInSeconds = Math.floor(startTime)
    let endInSeconds = Math.floor(endTime)


    let stringfiedDays = selectedDays.toString()

    let jsonObject = {
      "requestObject": {
        "name": formValue.name,
        "description": formValue.description,
        "premise": premiseId,
        "start": startInSeconds,
        "end": endInSeconds,
        "repeat_days": stringfiedDays,
        "type": formValue.type,
        "department": formValue.department.depertment_id,
        "company": compandyId
      },
      "requestService": "ADD_COMPANY_STAFF_SHIFT"  
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
