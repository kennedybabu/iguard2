import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateCompanySettingsService {

  constructor(private http:HttpClient) { } 

  editSettings(formValue:any, companyId: number, excludedRoles: any, settingsId: number): Observable<any> {

    let jsonObject = {
      "requestObject": {
          "leave_approvals_designation": formValue.leave_approvals_designation,
          "appointment_approvals_designation": formValue.appointment_approvals_designation,
          "excluded_appointments_designation": excludedRoles,
          "sms_name": formValue.sms_name,
          "company": companyId,
          "id": settingsId   
        },
      "requestService": "EDIT_COMPANY_SETTINGS_RULE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }


}
