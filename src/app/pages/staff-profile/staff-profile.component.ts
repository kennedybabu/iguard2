import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { Shift } from 'src/app/model/shift';
import { Staff } from 'src/app/model/staff';
import { GetStaffDetailsService } from 'src/app/services/staff/get-staff-details.service';
import { GetStaffShiftsService } from 'src/app/services/staff/get-staff-shifts.service';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss']
})
export class StaffProfileComponent implements OnInit, AfterViewInit {

  staffId!: number
  staff!: any
  staffShifts: any [] = []


  constructor(
    private getStaffDetailsService:GetStaffDetailsService,
    private route:ActivatedRoute,
    private getStaffShiftsService:GetStaffShiftsService
    ){}

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

      console.log(res.data)
    })
    
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

}
