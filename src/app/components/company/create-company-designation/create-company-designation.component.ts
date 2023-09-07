import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateCompanyRoleService } from 'src/app/services/company/create-company-role.service';
import { GetCompanyDeptsService } from 'src/app/services/company/get-company-depts.service';
import { GetCompanyDesignationsService } from 'src/app/services/company/get-company-designations.service';
import { GetCompanyRolesService } from 'src/app/services/company/get-company-roles.service';
import { NotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-create-company-designation',
  templateUrl: './create-company-designation.component.html',
  styleUrls: ['./create-company-designation.component.scss']
})
export class CreateCompanyDesignationComponent implements OnInit { 

  companyId!: number
  companyDepartments: any [] = []

  constructor(
    private getCompanyDepartmentsService: GetCompanyDeptsService,
    private getCompanyDesignationsService:GetCompanyDesignationsService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<CreateCompanyDesignationComponent>,
    private notificationService:NotificationService,
    private createCompanyRoleService:CreateCompanyRoleService
  ){
    this.companyId = data.companyId
  }


  ngOnInit(): void {
    this.getCompanyDepartmentsService.getDepartments(this.companyId).subscribe((res) => {
      this.companyDepartments = res.message
    })
  }


  designationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required)
  })

  onFormSubmit(){
    this.createCompanyRoleService.addRole(this.designationForm.value, this.companyId).subscribe((res) => {
      console.log()
      if(res.statusCode === 702){
        this.notificationService.sendSuccessMessage('role added')
        this.dialogRef.close()
      } else {
        this.notificationService.sendErrorMessage('try again, something went wrong')
      }
    })
  }

}
