import { Component, Inject } from '@angular/core';
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
    this.companyId = data.companyId 
  }


  

}
