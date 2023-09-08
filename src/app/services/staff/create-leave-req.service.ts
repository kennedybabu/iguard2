import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateLeaveReqService {

  constructor(private http:HttpClient) { }

  createLeave(formValue:any, staffId: number, premiseId:number): Observable<any>{  
    let start = formValue.from 
    let end = formValue.to

    let startstamp = new Date(start).getTime()
    let endstamp = new Date(end).getTime()
    console.log('called service')


    let jsonObject = {
      "requestObject": { 
        "staff": staffId,
        "reason": formValue.reason,
        "name": formValue.name,
        "from": startstamp,
        "to": endstamp,
        "premise": premiseId
      },
      "requestService": "CREATE_LEAVE_REQUEST_RULE"  
    }

    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
