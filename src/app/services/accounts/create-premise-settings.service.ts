import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatePremiseSettingsService {

  constructor(private http:HttpClient) { }

  addSettings(formValue: any, accountId: number): Observable<any> {
    let delayTime = +formValue.guard_delay_between_scans 

    let delayTimeInSecs = delayTime * 60

    let jsonObject = {
      "requestObject":{
        "account": accountId,
        "appointment_type":formValue.appointment_type,
        "guard_scan_times": +formValue.guard_scan_times,
        "guard_scan_minimum_distance": +formValue.guard_scan_minimum_distance,
        "guard_delay_between_scans": delayTimeInSecs,
        "residential_type": formValue.residential_type,
        "premise_type": formValue.premise_type
        },
        "requestService":"ADD_ACCOUNT_SETTINGS_RULE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
