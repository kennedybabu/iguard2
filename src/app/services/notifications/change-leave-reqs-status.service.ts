import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChangeLeaveReqsStatusService {

  user!: number
  accountId!: number

  constructor(private http:HttpClient, 
    private authService:AuthService) { 
      this.authService.userData$.subscribe((res) => {
        let user = JSON.parse(res)
        this.accountId = user?.userId
      })
    } 

  changeStatus(id: number, status:string): Observable<any> {
    let jsonObject = {
      "requestObject": {
        "leaveId": id,
        "user": this.accountId,
        "status": status   
      },
      "requestService": "CHANGE_LEAVE_REQUEST_STATUS_RULE"
    }
    return this.http.post('https://iguardbe.helapay.africa/api/GateGuard', jsonObject)
  }
}
