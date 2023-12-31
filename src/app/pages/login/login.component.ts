import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
// import * as CryptoJs from 'crypto-js';


import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/shared/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService:AuthService,
    private router:Router,
    private notificationService:NotificationService){
        if(localStorage.getItem('ulpSaH5wx1pO!E')) {
        const user = (<string>localStorage.getItem('ulpSaH5wx1pO!E'))
        this.userDataSubject.next(user)
      }
  }

  error!: string

  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  userDate$: Observable<any> = this.userDataSubject.asObservable()

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })


  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe((res:any) => {
      if(res.statusCode === 702) {
        this.notificationService.sendSuccessMessage('logged in successfully')
        this.router.navigate(['/'])
      }
    },(error) => {
      this.notificationService.sendErrorMessage('something went wrong try again')
    })
  }
 

  get username(){
    return this.loginForm.get('username')
  }

  get password(){
    return this.loginForm.get('password')
  }

  clearError(){
    this.error = ''
  }

}
