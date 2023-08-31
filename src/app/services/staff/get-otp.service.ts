import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetOtpService {

  constructor(private http:HttpClient) { } 


  getOtp(formValue:any): Observable<any> {
      let jsonObject = {
      "requestObject": {
        "msisdn": formValue.msisdn
        },
        "requestService": "STAFF_LOGIN"
      }
    return this.http.post('https://iguardbe.helapay.africa/api/staffAuthentication', jsonObject)
  }
}
