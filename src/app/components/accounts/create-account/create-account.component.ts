import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateAccountService } from 'src/app/services/accounts/create-account.service';
import { CreatePremiseAdminService } from 'src/app/services/accounts/create-premise-admin.service';
import { CreatePremiseSettingsService } from 'src/app/services/accounts/create-premise-settings.service';
import { CreatePremiseService } from 'src/app/services/accounts/create-premise.service';
import { NotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  accountId!: number
  firstStep: boolean = false
  premiseCategories: any [] = []
  premiseId!: number


  constructor(
    private notificationService:NotificationService,
    private createAccountService:CreateAccountService,
    private createPremiseService: CreatePremiseService,
    private createPremiseAdminService:CreatePremiseAdminService,
    private createPremiseSettingsService:CreatePremiseSettingsService
  ){

  }

  createAccountForm = new FormGroup({
    accountName: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    emailAddress: new FormControl('', Validators.required),
    msisdn: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })



  createPremiseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    narration: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required)
  })



  createAdminForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    middle_name: new FormControl('', Validators.required),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    msisdn: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required)
  })


  addAccountSettingsForm = new FormGroup({
    appointment_type: new FormControl('', Validators.required),
    guard_scan_times: new FormControl('',Validators.required),
    guard_scan_minimum_distance: new FormControl('', Validators.required),
    guard_delay_between_scans: new FormControl('', Validators.required),
    residential_type: new FormControl('', Validators.required),
    premise_type: new FormControl('', Validators.required),
  })


  //create account
  createAccount() {
    this.createAccountService.createAccount(this.createAccountForm.value).subscribe((res) => {
      if(res.statusCode === 702) {
        this.notificationService.sendSuccessMessage('Account Created')
        this.accountId = res.message.account
        this.firstStep = true
      } else if(res.statusCode === 701) {
        this.notificationService.sendErrorMessage('Account not created')
      } else if(res.statusCode === 700) {
        this.notificationService.sendErrorMessage('Account already exists')
      }
    })
  }

  //create account premise
  createPremiseFormSubmit(){
    this.createPremiseService.createPremise(this.createPremiseForm.value, this.accountId).subscribe((res) => {
      if(res.statusCode === 702){
        this.premiseId = res.message.id
        this.notificationService.sendSuccessMessage('Premise Created')
      } else {
        this.notificationService.sendErrorMessage('Premise not created, try again')
      }
    })
  }


  //create account admin 
  createPremiseAdminFormSubmit(){
    this.createPremiseAdminService.createAdmin(this.createAdminForm.value, this.premiseId, this.accountId).subscribe((res) => {
      if(res.statusCode === 702) {
        this.notificationService.sendSuccessMessage('Admin Created')
      } else {
        this.notificationService.sendErrorMessage('Admin not created, try again')
      }
    })
  }


  //add premise settings 
  createPremiseSettingsFormSubmit(){
    this.createPremiseSettingsService.addSettings(this.addAccountSettingsForm, this.accountId).subscribe((res) => {
      if(res.statusCode === 702) {
        this.notificationService.sendSuccessMessage('Premise Settings Added')
      } else {
        this.notificationService.sendErrorMessage('Something went wrong, try again')
      }
    })
  }





  get accountName(){
    return this.createAccountForm.get('accountName')
  }

  get location(){
    return this.createAccountForm.get('location')
  }

  get emailAddress(){
    return this.createAccountForm.get('emailAddress')
  }

  get msisdn(){
    return this.createAccountForm.get('msisdn')
  }

  get description(){
    return this.createAccountForm.get('description')
  }

  get username(){
    return this.createAccountForm.get('username')
  }

  get password(){
    return this.createAccountForm.get('password')
  }


  //create premise form
  get name(){
    return this.createPremiseForm.get('name')
  }

  get premiseLocation(){
    return this.createPremiseForm.get('location')
  }

  get narration(){
    return this.createPremiseForm.get('narration')
  }

  get category(){
    return this.createPremiseForm.get('category')
  }  

  //create admin

  get first_name(){
    return this.createAdminForm.get('first_name')
  }

  get middle_name(){
    return this.createAdminForm.get('middle_name')
  }

  get last_name(){
    return this.createAdminForm.get('last_name')
  }

  get AdminEmailAddress(){
    return this.createAdminForm.get('emailAddress')
  }

  get adminMsisdn(){
    return this.createAdminForm.get('msisdn')
  }

  get adminUsername(){
    return this.createAdminForm.get('username')
  }

  get appointment_type(){
    return this.addAccountSettingsForm.get('appointment_type')
  }

  get guard_scan_times(){
    return this.addAccountSettingsForm.get('guard_scan_times')
  }

  get guard_scan_minimum_distance(){
    return this.addAccountSettingsForm.get('guard_scan_minimum_distance')
  }

  get guard_delay_between_scans(){
    return this.addAccountSettingsForm.get('guard_delay_between_scans')
  }

}
