import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateCompanySettingsService {

  constructor(private http:HttpClient) { }


  createSettings(formValue:any, companyId: number, excludedRoles: any): Observable<any> {

    let jsonObject = {
      "requestObject": {
          "leave_approvals_designation": formValue.leave_approvals_designation,
          "appointment_approvals_designation": formValue.appointment_approvals_designation,
          "excluded_appointments_designation": excludedRoles,
          "sms_name": formValue.sms_name,
          "company": companyId   
        },
      "requestService": "CREATE_COMPANY_SETTINGS_RULE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
