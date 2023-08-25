import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetPremiseAppointmentsService } from 'src/app/services/appointments/get-premise-appointments.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GetAllPremisesService } from 'src/app/services/premise/get-all-premises.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selected!: Date | null;
  activeUser!: any
  premises!:any
  currentPremise!: any
  showingPremiseId!: any

  constructor(
    private router:Router,
    private getAllPremisesService: GetAllPremisesService,
    private authService: AuthService,
    private getPremiseAppointmntService:GetPremiseAppointmentsService){
      this.authService.userData$.subscribe((res) => {
        let user = res
        this.activeUser = JSON.parse(user)
      })
    }

  change(){
    this.router.navigate(['companies'])
  }  


  ngOnInit(): void {

    //get user premises 
    this.getAllPremisesService.getPremises(this.activeUser?.accountId).subscribe((res: any) => {
      if(res.statusCode === 702) {
        this.premises = res.message 

        if(localStorage.getItem('currentPremise')) {
          this.showingPremiseId = localStorage.getItem('currentPremise')
          console.log(this.showingPremiseId)
        } else {
          this.currentPremise = this.premises[0] 
          this.showingPremiseId = this.currentPremise.premise_id
          localStorage.setItem('currentPremise', this.currentPremise.premise_id)
        }

        this.getPremiseAppointmntService.getPremiseAppointments(this.showingPremiseId).subscribe((res) => {
          console.log(res)
        })

      }
    })


    //get premise appointments 
  }






}
