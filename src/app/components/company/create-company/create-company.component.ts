import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateCompanyService } from 'src/app/services/company/create-company.service';
import { CurrentPremiseService } from 'src/app/services/shared/current-premise.service';
import { NotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent {

  currentPremise!:any


  constructor(private createCompanyService: CreateCompanyService,
    private currentPremiseService: CurrentPremiseService,
    private notificationService:NotificationService,
    private dialogRef: MatDialogRef<CreateCompanyComponent>
    ){
      this.currentPremiseService.premiseData$.subscribe((res) => {
        this.currentPremise = JSON.parse(res)
      })
    }


  createCompanyForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })


  onFormSUbmit(){
    this.createCompanyService.createCompany(this.createCompanyForm.value, this.currentPremise?.premise_id).subscribe((res) => {
      if(res) {
        this.notificationService.sendSuccessMessage('company added')
      } else {
        this.notificationService.sendErrorMessage('something went wrong, try again')
      }
    })
  }

  closeDialog(){
    this.dialogRef.close()
  }

}
