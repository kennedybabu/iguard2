import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateCompanySettingsService } from 'src/app/services/company/create-company-settings.service';
import { NotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-create-company-settings',
  templateUrl: './create-company-settings.component.html',
  styleUrls: ['./create-company-settings.component.scss']
})
export class CreateCompanySettingsComponent {

  companyDesignations: any [] = []
  companyId!: number 
  excludedDesignations: any [] = []
  
  constructor(
    private createCompanySettingsService: CreateCompanySettingsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<CreateCompanySettingsComponent>
  ){
    this.companyId = data.companyId
    this.companyDesignations = data.companyDesignations 
  }


  createCompanySettingsForm = new FormGroup({
    leave_approvals_designation: new FormControl('', Validators.required),
    appointment_approvals_designation : new FormControl('', Validators.required),
    excluded_appointments_designation : new FormControl(''),
    sms_name: new FormControl('', Validators.required),
  })

  getSelectedRoles(event:any){
    if(event.target.checked == true) {
      this.excludedDesignations.push(+event.target.value)
    } else {
      return
    }
  }


  onFormSubmit(){
    this.createCompanySettingsService.createSettings(this.createCompanySettingsForm.value, this.companyId, this.excludedDesignations).subscribe((res) => {
      if(res.statusCode === 702){
        this.notificationService.sendSuccessMessage('Settings created')
        this.dialogRef.close()
      } else {
        this.notificationService.sendErrorMessage('Something went wrong, try again')
      }
    })
  }

  
  closeDialog(){
    this.dialogRef.close()
  }

}
