import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { Shift } from 'src/app/model/shift';
import { GetStaffDetailsService } from 'src/app/services/staff/get-staff-details.service';
import { GetStaffShiftsService } from 'src/app/services/staff/get-staff-shifts.service';
import {MatDialog } from '@angular/material/dialog';
import { DateRangeComponent } from 'src/app/components/shared/date-range/date-range.component';
import { FormControl, FormGroup } from '@angular/forms';
import { GetStaffAppointmentsService } from 'src/app/services/staff/get-staff-appointments.service';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { Appointment } from 'src/app/model/appointment';
import { AuthService } from 'src/app/services/auth/auth.service';



interface Appointments {
  Id: number,
  StartTime: Date,
  EndTime: Date,
  Subject: string
}


@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]

})
export class StaffProfileComponent implements OnInit, AfterViewInit {

  staffId!: number
  staff!: any
  staffShifts: any [] = []
  staffAppointments: Appointment [] = []
  approvedAppointments:any [] = []
  userRole!: any

  


  public eventSettings: EventSettingsModel = { }


  constructor(
    private getStaffDetailsService:GetStaffDetailsService,
    private route:ActivatedRoute,
    private getStaffShiftsService:GetStaffShiftsService,
    private dialog: MatDialog,
    private getStaffAppointmentsService:GetStaffAppointmentsService,
    private authService:AuthService
    ){
      this.authService.userData$.subscribe((res) => {
        let user = JSON.parse(res)


        this.userRole = user?.permissions[0].role_name
      })
    }

  displayedColumns: string[] = ['date', 'checkin', 'checkout', 'work_hrs', 'status'];
  dataSource = new MatTableDataSource<Shift>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    let currentDate = new Date()    


    this.route.params.subscribe(
      (params:Params) => {
        this.staffId = +params['id']
      }
    )


    this.getStaffDetailsService.getStaffInfo(this.staffId).subscribe((res) => {
      this.staff = res.message.info
    })

    this.getStaffShiftsService.getDetails(this.staffId, currentDate).subscribe((res) => {
      this.staffShifts = res.data
      this.dataSource.data = res.data
    })

    this.getStaffAppointmentsService.getUserAppointments(this.staffId).subscribe((res) => {
      this.staffAppointments = res?.message?.info

      this.approvedAppointments = this.staffAppointments.filter((item) => {
        return item.status === 'APPROVED'
      })

      this.mapAppointmentsToDataSource()
    })
    
  }

  public getAppointmentColor(data: any){
    if(data.Status === 'PENDING') {
      return '#ffca3a'
    } else if(data.Status === 'APPROVED') {
      return '#aaf683'
    } else {
      return '#3f51b5;'
    }
  }


  private mapAppointmentsToDataSource() {
    const approvedAppointments: Appointment [] = this.staffAppointments.filter((item) => {
      return item.status === 'APPROVED'
    })
    const appointments: Appointments [] = approvedAppointments.map((item: Appointment) => {
      return {
        Id: item.id,
        Subject: item.narration,
        StartTime: new Date(item.start),
        EndTime: new Date(item.end),
        Status: item.status
      }
    })
    this.eventSettings = {
      dataSource: appointments
    }
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  //get working hours 
  getDuration(checkin: Date, checkout: Date): string {
    if (!checkin || !checkout || !(checkout instanceof Date)) {
      return ''; // Return an empty string if either checkin or checkout is not defined or checkout is not a Date
    }

    const diffMilliseconds = checkout.getTime() - checkin.getTime()

    const hours = Math.floor(diffMilliseconds / (1000 * 60 * 60))
    const minutes = Math.floor((diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m`

  }

  
  openDialog() {
    const dialogRef = this.dialog.open(DateRangeComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  // onDateRangeSelected(dateRange: { start: string, end: string}) {
  //   console.log(dateRange)
  // }


  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  submitDate(){
    const startDate = this.range.controls['start'].value 
    const endDate = this.range.controls['end'].value
    
    console.log(startDate, endDate)

    this.getStaffShiftsService.getTimedDetails(this.staffId, startDate, endDate).subscribe((res) => {
      console.log(res)
      this.staffShifts = res.data
      this.dataSource.data = res.data
    })

  }

}
