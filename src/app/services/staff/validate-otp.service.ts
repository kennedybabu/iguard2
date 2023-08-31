import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateOtpService {

  constructor(private http:HttpClient) { } 

  validateStaffOtp(formValue:any): Observable<any> {
    let jsonObject = {
      "requestObject": {
        "msisdn": formValue.msisdn,
        "code": formValue.code
      },
      "requestService": "STAFF_OTP_VALIDATION"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/staffAuthentication', jsonObject)
  }
}
