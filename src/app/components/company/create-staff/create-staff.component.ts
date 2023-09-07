import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CreateCompanyStaffService } from 'src/app/services/company/create-company-staff.service';
import { GetCompanyDeptsService } from 'src/app/services/company/get-company-depts.service';
import { GetCompanyDesignationsService } from 'src/app/services/company/get-company-designations.service';
import { CurrentPremiseService } from 'src/app/services/shared/current-premise.service';
import { NotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.scss']
})
export class CreateStaffComponent implements OnInit { 



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
    private createCompanyStaffService:CreateCompanyStaffService,
    private getCompanyDeptsService:GetCompanyDeptsService,
    private getCompanyDesignationsService:GetCompanyDesignationsService
  ){
    this.companyId = data.companyId 

    this.currentPremiseService.premiseData$.subscribe((res) => {
      let currentPremiseObject = JSON.parse(res)
      this.currentPremiseId = currentPremiseObject?.premise_id
    })

    this.authService.userData$.subscribe((res) => {
      this.user = JSON.parse(res)
    })

  }


  ngOnInit(): void {
    this.getCompanyDeptsService.getDepartments(this.companyId).subscribe((res) => {
      this.companyDepts = res.message
    })

    this.getCompanyDesignationsService.getDesignations(this.companyId).subscribe((res) => {
      this.companyDesignations = res.message

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
    this.createCompanyStaffService.createStaff(this.createStaffForm.value, this.user?.accountId, this.currentPremiseId, this.companyId).subscribe((res) => {
      if(res.statusCode === 702) {
        this.notificationService.sendSuccessMessage('Staff Added')
        this.dialogRef.close()
      } else {
        this.notificationService.sendErrorMessage('something went wrong try again')
      }
    })
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

  closeDialog(){
    this.dialogRef.close()
  }

}
