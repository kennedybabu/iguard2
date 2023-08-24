import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
// import * as CryptoJs from 'crypto-js';


import { KEY } from 'src/key';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService:AuthService,
    private router:Router){

  }

  error!: string

  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  userDate$: Observable<any> = this.userDataSubject.asObservable()

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })


  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe((response) => {
      if(response?.statusCode === 702){
        let userObject = 
        {
          'user': response.message.user, 
          'permissions': response.message.permissions,
          'token': response.message.accessToken, 
          'accountId': response.message.accountId, 
          'userId': response.message.userId
        }
        
        let objectString = JSON.stringify(userObject) 
        // const encryptedObject = CryptoJs.AES.encrypt(objectString, KEY).toString()
        this.userDataSubject.next(userObject)  
        console.log(userObject)      
        // localStorage.setItem('ulpSaH5wx1pO!E', encryptedObject)
        this.router.navigate(['/'])
      }
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
