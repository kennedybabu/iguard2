import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CreateCompanyStaffService } from 'src/app/services/company/create-company-staff.service';
import { CurrentPremiseService } from 'src/app/services/shared/current-premise.service';
import { NotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.scss']
})
export class CreateStaffComponent { 



  premiseId!: number 
  companyId!: number 
  companyDepts: any [] = []
  currentPremiseId!: any
  user!: any
  companyDesignations: any [] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<CreateStaffComponent>,
    private notificationService:NotificationService,
    private currentPremiseService:CurrentPremiseService,
    private authService:AuthService,
    private createCompanyStaffService:CreateCompanyStaffService
  ){
    this.companyDepts = data.companyDepts 
    this.companyId = data.companyId 
    this.companyDesignations = data.companyDesignations

    this.currentPremiseService.premiseData$.subscribe((res) => {
      let currentPremiseObject = res
      this.currentPremiseId = currentPremiseObject?.premise_id
    })

    this.authService.userData$.subscribe((res) => {
      console.log(res)
    })

  }



  createStaffForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    middle_name: new FormControl(''),
    last_name: new FormControl('', Validators.required),
    emailAddress: new FormControl('', Validators.email),
    username: new FormControl('', Validators.required),
    msisdn: new FormControl('', Validators.required),
    department: new FormControl(''),
    designation: new FormControl('')
  })


  onSubmit(){
    // this.createCompanyStaffService.createStaff(this.createStaffForm.value, )
  }

  get first_name(){
    return this.createStaffForm.get('first_name')
  }

  get middle_name(){
    return this.createStaffForm.get('middle_name')
  }

  get last_name(){
    return this.createStaffForm.get('last_name')
  }

  get emailAddress(){
    return this.createStaffForm.get('emailAddress')
  }

  get username(){
    return this.createStaffForm.get('username')
  }

  get msisdn(){
    return this.createStaffForm.get('msisdn')
  }

}
