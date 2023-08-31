import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddPremiseBeaconsService } from 'src/app/services/premise/add-premise-beacons.service';
import { NotificationService } from 'src/app/services/shared/notification.service';

@Component({
  selector: 'app-add-premise-beacons',
  templateUrl: './add-premise-beacons.component.html',
  styleUrls: ['./add-premise-beacons.component.scss']
})
export class AddPremiseBeaconsComponent {

  premiseId!: number

  constructor(private addPremiseBeaconService:AddPremiseBeaconsService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<AddPremiseBeaconsComponent>,
    private notificationService:NotificationService){
      this.premiseId = data.premiseId
    }

  createBeacon = new FormGroup({
    signature: new FormControl('', Validators.required),
    description : new FormControl('', Validators.required)
  })

  get description(){
    return this.createBeacon.get('description')
  }

  get signature(){
    return this.createBeacon.get('signature')
  }


  onSubmit(){
    this.addPremiseBeaconService.createBeacon(this.createBeacon.value, this.premiseId).subscribe((res) => {
      if(res.statusCode === 702) {
          this.dialogRef.close()
          this.notificationService.sendSuccessMessage('beacon created')
      }
    })
  }





}
