import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChangeAppointmentStatusService {
  accountId!: number

  constructor(private http:HttpClient, 
    private authService:AuthService) {
      this.authService.userData$.subscribe((res) => {
        let user = JSON.parse(res)
        this.accountId = user?.accountId
      })
     }

  changeStatus(id: number, status:string): Observable<any> {
    let jsonObject = {
      "requestObject": {
        "appointment": id,
        "user": this.accountId,
        "status": status   
      },
      "requestService": "CHANGE_APPOINTMENT_STATUS_RULE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
