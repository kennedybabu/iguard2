import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetPremiseAppointmentsService } from 'src/app/services/appointments/get-premise-appointments.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GetPremiseCompaniesService } from 'src/app/services/company/get-premise-companies.service';
import { GetPremiseLeaveRequestsService } from 'src/app/services/leave-req/get-premise-leave-requests.service';
import { GetAllPremisesService } from 'src/app/services/premise/get-all-premises.service';
import { CurrentPremiseService } from 'src/app/services/shared/current-premise.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selected!: Date | null;
  activeUser!: any
  premises: any [] = []
  currentPremise!: any
  showingPremiseId!: any
  premiseAppointments: any [] = []
  currentDate!: any
  storedPremise!: any
  premiseId!: number
  premiseCompanies: any [] = []
  totalStaff!: number
  premiseLeaveRequest: any [] = []

  private userCurrentPremiseSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  currentPremiseData$: Observable<any> = this.userCurrentPremiseSubject.asObservable()


  constructor(
    private router:Router,
    private getAllPremisesService: GetAllPremisesService,
    private authService: AuthService,
    private getPremiseAppointmntService:GetPremiseAppointmentsService,
    private getPremiseLeaveReqServices: GetPremiseLeaveRequestsService,
    private currentPremiseService:CurrentPremiseService,
    private getPremiseCompaniesService: GetPremiseCompaniesService
    ){

      this.authService.userData$.subscribe((res) => {
        let user = res
        this.activeUser = JSON.parse(user)
      })


      this.currentPremiseService.premiseData$.subscribe((res) => {
        this.storedPremise = JSON.parse(res)
 
        this.premiseId = this.storedPremise?.premise_id 
      })  
      
    }
    
    change(){
      this.router.navigate(['companies'])
    }  


    viewPremiseCompanies() {
      this.router.navigate(['companies', this.currentPremise.premise_id])
    }
    
    
    ngOnInit(): void {

    this.totalStaff = 0 

    //get total staff in the premise
    for(let company of this.premiseCompanies) {
      this.totalStaff += company.staff_count
    }

    this.getPremiseCompaniesService.getCompanies(this.premiseId).subscribe((res) => {
      this.premiseCompanies = res?.message    

    })


    this.currentDate = new Date() 
    //get user premises    
    this.getAllPremisesService.getPremises(this.activeUser?.accountId).subscribe((res: any) => {
      if(res.statusCode === 702) {
        this.premises = res.message 

        let item = localStorage.getItem('currentPremise') 

        if(item) {

          this.currentPremise = JSON.parse(item)
          this.currentPremiseService.currentPremiseSubject.next(JSON.stringify(this.currentPremise))
          this.showingPremiseId = this.currentPremise?.premise_id
        } else {
          this.currentPremise = this.premises[0] 
          this.showingPremiseId = this.currentPremise?.premise_id
          this.currentPremiseService.currentPremiseSubject.next(JSON.stringify(this.currentPremise))
          localStorage.setItem('currentPremise', JSON.stringify(this.currentPremise))
        }        
      }


      this.getPremiseAppointmntService.getPremiseAppointments(this.showingPremiseId).subscribe((res) => {
        this.premiseAppointments = res?.message.info
      })


      this.getPremiseLeaveReqServices.getDetails(this.currentDate, this.storedPremise.premise_id).subscribe((res) => {
        this.premiseLeaveRequest = res.message.info
      })

      
    })    
    
  }
}
