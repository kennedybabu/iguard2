import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateCompanySettingsService } from 'src/app/services/company/update-company-settings.service';
import { NotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-update-company-settings',
  templateUrl: './update-company-settings.component.html',
  styleUrls: ['./update-company-settings.component.scss']
})
export class UpdateCompanySettingsComponent {

  companyDesignations:any [] = []
  excludedDesignations: any [] = []
  companyId!: number
  companySettings!: any 

  constructor(
    private dialogRef: MatDialogRef<UpdateCompanySettingsService>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService:NotificationService,
    private updateCompanySettingsService:UpdateCompanySettingsService 
  ) {
    this.companyId = data.companyId 
    this.companyDesignations = data.companyDesignations
    this.companySettings = data.companySettings 
  }

  editSettings = new FormGroup({
    leave_approvals_designation: new FormControl('', Validators.required),
    appointment_approvals_designation : new FormControl('', Validators.required),
    excluded_appointments_designation : new FormControl(''),
    sms_name: new FormControl('', Validators.required),
  })


  onFormSubmit(){
    this.updateCompanySettingsService.editSettings(this.editSettings.value, this.companyId, this.excludedDesignations.join(), this.companySettings.id).subscribe((res) => {
      if(res.statusCode === 702){
        this.notificationService.sendSuccessMessage('updated')
        this.dialogRef.close()
      } else {
        this.notificationService.sendErrorMessage(res.message.info)
      }
    })
  }

  getSelectedRoles(event:any){
    if(event.target.checked == true) {
      this.excludedDesignations.push(+event.target.value)
    } else {
      return
    }
  }


  closeDialog(){
    this.dialogRef.close()
  }

}
