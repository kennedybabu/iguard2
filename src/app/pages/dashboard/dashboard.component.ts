import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetPremiseAppointmentsService } from 'src/app/services/appointments/get-premise-appointments.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GetPremiseCompaniesService } from 'src/app/services/company/get-premise-companies.service';
import { GetPremiseLeaveRequestsService } from 'src/app/services/leave-req/get-premise-leave-requests.service';
import { ChangeAppointmentStatusService } from 'src/app/services/notifications/change-appointment-status.service';
import { ChangeLeaveReqsStatusService } from 'src/app/services/notifications/change-leave-reqs-status.service';
import { GetAllPremisesService } from 'src/app/services/premise/get-all-premises.service';
import { GetPremiseAttendanceService } from 'src/app/services/premise/get-premise-attendance.service';
import { CurrentPremiseService } from 'src/app/services/shared/current-premise.service';
import { NotificationService } from 'src/app/services/shared/notification.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: ChartOptions;

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
  totalStaff = 0
  premiseLeaveRequest: any [] = []
  splicedAppointments: any []= []
  splicedeLeaveRequests: any [] = []


  premiseAttendance: any [] = []

  pendingShifts: any [] = []
  endedShifts: any [] = []
  startedShifts: any [] = []
  companyNames: string [] = []





  private userCurrentPremiseSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  currentPremiseData$: Observable<any> = this.userCurrentPremiseSubject.asObservable()


  constructor(
    private router:Router,
    private getAllPremisesService: GetAllPremisesService,
    private authService: AuthService,
    private getPremiseAppointmntService:GetPremiseAppointmentsService,
    private getPremiseLeaveReqServices: GetPremiseLeaveRequestsService,
    private currentPremiseService:CurrentPremiseService,
    private getPremiseCompaniesService: GetPremiseCompaniesService,
    private changeLeaveReqsStatusService: ChangeLeaveReqsStatusService,
    private changeAppointmentStatusService:ChangeAppointmentStatusService,
    private notificationService:NotificationService,
    private getPremiseAttendanceService:GetPremiseAttendanceService
    ){

    

      this.chartOptions = {
        series: [    
        ],
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          stackType: "100%"
        },
        dataLabels:{
          style: {
            colors: ['#FFB703', '#000000', '#06D6A0']
          }
        },
        plotOptions:{},
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        xaxis: {
          categories: this.companyNames
        },
        fill: {
          opacity: 1,
          colors: ['#FFB703', '#000000', '#06D6A0']
        },
        legend: {
          position: "right",
          offsetX: 0,
          offsetY: 50
        }
      };
      
      

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
      
      this.getPremiseCompaniesService.getCompanies(this.premiseId).subscribe((res) => {
        console.log(res)
        this.premiseCompanies = res?.message

        this.startProcessing()
      })

    this.currentDate = new Date() 

    //get user premises    
    this.getAllPremisesService.getPremises(this.activeUser?.accountId).subscribe((res: any) => {
      if(res.statusCode === 702) {
        this.premises = res.message 

        console.log(this.premises)

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


      this.getPremiseAppointmntService.getPremiseAppointments(this.storedPremise.premise_id).subscribe((res) => {
        console.log(res)
        this.premiseAppointments = res?.message.info
        this.splicedAppointments = this.premiseAppointments.slice(0,4)
      })


      this.getPremiseLeaveReqServices.getDetails(this.currentDate, this.storedPremise.premise_id).subscribe((res) => {
        this.premiseLeaveRequest = res.message.info
        this.splicedeLeaveRequests = this.premiseLeaveRequest.slice(0,4)
      })

      this.getPremiseAttendanceService.getAttendance(this.premiseId).subscribe((res) => {
        this.premiseAttendance = res.message  

        for(let attendance of this.premiseAttendance) {
          const {ended, pending, started} = attendance 

          this.startedShifts.push(started)
          this.pendingShifts.push(pending)
          this.endedShifts.push(ended)
        }


        this.chartOptions.series = [
          {name: 'started', data: this.startedShifts},
          {name: 'pending', data: this.pendingShifts},
          {name: 'ended', data: this.endedShifts}
          
        ]

        this.chartOptions.xaxis.categories = this.companyNames
      })
      
    }) 
    
    //
  }


  processCompany(index: number){
    if(index < this.premiseCompanies.length) {
      const company = this.premiseCompanies[index]
      this.totalStaff += company.staff_count 
      this.companyNames.push(company.name)

      this.processCompany(index + 1)

    }
  }

  startProcessing(){
    this.processCompany(0)
  }


  changePremise(premiseId: number) {
    this.showingPremiseId = +premiseId 

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

  approveAppointment(id: number,status: string){
    this.changeAppointmentStatusService.changeStatus(id, status).subscribe((res) => {
      if(res.statusCode === 701){
        this.notificationService.sendErrorMessage(res.message)
        this.getPremiseAppointmntService.getPremiseAppointments(this.showingPremiseId).subscribe((res) => {
          this.premiseAppointments = res?.message.info
        })
      } else if(res.statusCode === 702 ){      
        this.notificationService.sendSuccessMessage(res.message)
        this.getPremiseAppointmntService.getPremiseAppointments(this.showingPremiseId).subscribe((res) => {
          this.premiseAppointments = res?.message.info
        })
      } else {
        this.notificationService.sendErrorMessage('something went wrong,try again')
      }
    })
  }

  approveLeave(reqid:number, action:string){
    this.changeLeaveReqsStatusService.changeStatus(reqid, action).subscribe((res) => {
      if(res.statusCode === 702){
        this.notificationService.sendSuccessMessage(res.message)
        this.getPremiseLeaveReqServices.getDetails(this.currentDate, this.storedPremise.premise_id).subscribe((res) => {
          this.premiseLeaveRequest = res.message.info
        })
      } else {
        this.notificationService.sendErrorMessage('something went wrong,try again')

      }
    })
  }
}
