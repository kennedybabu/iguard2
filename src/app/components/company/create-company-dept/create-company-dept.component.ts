import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateCompanyDeptService } from 'src/app/services/company/create-company-dept.service';
import { CurrentPremiseService } from 'src/app/services/shared/current-premise.service';
import { NotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-create-company-dept',
  templateUrl: './create-company-dept.component.html',
  styleUrls: ['./create-company-dept.component.scss']
})
export class CreateCompanyDeptComponent { 

  premiseId!:number
  companyId!: number
  premise!: any


  constructor(
    private createCompanyDeptService:CreateCompanyDeptService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<CreateCompanyDeptComponent>,
    private currentPremiseService: CurrentPremiseService,
    private notificationService:NotificationService
    ) {
      this.companyId = data.companyId

      this.currentPremiseService.premiseData$.subscribe((res) => {
        let object = JSON.parse(res) 

        this.premiseId = object.premise_id

        console.log(object)
      })

    }

    createDepartmentForm = new FormGroup({
      department_name: new FormControl('', Validators.required),
      narration: new FormControl('', Validators.required)
    })
  
    onDepartmentFormSubmit(){
     this.createCompanyDeptService.createDepartment(this.createDepartmentForm.value, this.premiseId, this.companyId).subscribe((res) => {
        if(res.statusCode === 702){
          this.dialogRef.close();
          this.notificationService.sendSuccessMessage('Department Created')
        } else {
          this.notificationService.sendErrorMessage('something went wrong, try again')
        }
      })
    }


    closeDialog(){
      this.dialogRef.close()
    }

}
