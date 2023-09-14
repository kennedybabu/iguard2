import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationService } from 'src/app/services/shared/notification.service';
import { GetOtpService } from 'src/app/services/staff/get-otp.service';
import { ValidateOtpService } from 'src/app/services/staff/validate-otp.service';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.scss']
})
export class StaffLoginComponent {

  hasPassword: boolean = false
  loggedInStaff!: any
  modifiedObject!: any
  id!: any


  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  userData$: Observable<any> = this.userDataSubject.asObservable()


  constructor(
    private getOtpService:GetOtpService,
    private notificationService: NotificationService,
    private router:Router,
    private validateOtpService:ValidateOtpService){
      if(localStorage.getItem('ulpSaH5wx1pO!E')) {
        const user = (<string>localStorage.getItem('ulpSaH5wx1pO!E'))
        this.userDataSubject.next(user)
      }
    }

    staffForm = new FormGroup({
      msisdn: new FormControl(''),
      code: new FormControl('')
    })


    onSubmit(){
      if(this.hasPassword) {
        this.validateOtpService.validateStaffOtp(this.staffForm.value).subscribe((res) => {
          console.log(res)
          if(res.statusCode === 702) {
            let user = res.user 

            this.id = res.user?.user?.userId

            let userObject = 
            {
              'user': res?.user?.user, 
              'permissions': res?.user?.permissions,
              'token': res?.user?.accessToken, 
              'accountId': res?.user?.accountId, 
              'userId': res?.user?.user?.userId
            }
  
            this.modifiedObject = JSON.stringify(userObject)
            
            this.userDataSubject.next(this.modifiedObject)  
            localStorage.setItem('ulpSaH5wx1pO!E', this.modifiedObject)
            this.notificationService.sendSuccessMessage('logged in successful')
            this.router.navigate(['staff-profile', +this.id])
          } else {
            this.notificationService.sendErrorMessage(res.message)
          }
        })
      } if(!this.hasPassword) {
        this.getOtpService.getOtp(this.staffForm.value).subscribe(
          (res) => {
            this.notificationService.sendSuccessMessage(`OTP sent to ${this.staffForm.value.msisdn}`) 
            this.hasPassword = true  
          }, (error) => {
            if(error.status === 0) {
              this.notificationService.sendErrorMessage('User is not a staff')
            } else {
              this.notificationService.sendErrorMessage('Something went wrong try again')
            }
          })
      }
    }

}
