import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetStaffDetailsService {

  constructor(private http:HttpClient) { }

  getStaffInfo(id:any): Observable<any> {
    let jsonObject = {
      "requestObject":{
        "userId": id
        },
        "requestService":"GET_USER_DETAILS_RULE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
