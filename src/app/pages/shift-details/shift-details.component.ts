import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Staff } from 'src/app/model/staff';
import { GetCompanyShiftStaffService } from 'src/app/services/company/get-company-shift-staff.service';

@Component({
  selector: 'app-shift-details',
  templateUrl: './shift-details.component.html',
  styleUrls: ['./shift-details.component.scss']
})
export class ShiftDetailsComponent implements OnInit, AfterViewInit {

  shiftId!: number
  shiftObject!: any
  companyId!: number
  companyStaff: any [] = []

  displayedColumns: string[] = ['firstName', 'msisdn'];
  dataSource = new MatTableDataSource<Staff>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private route:ActivatedRoute,
    // private getShiftDetailsService:GetShiftDetailsService,
    private getCompanyShiftStaffService:GetCompanyShiftStaffService,
    private router:Router
  ){}


  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.shiftId = +params['id']
      }
    )


    this.getCompanyShiftStaffService.getStaff(this.shiftId).subscribe((res) => {
     this.shiftObject = res.message
      
      this.dataSource.data = res.message.assignedStaff

      this.companyStaff = res.message.assignedStaff

      this.companyId = +this.shiftObject.company 

      console.log(this.companyId)
    })


    // this.getShiftDetailsService.getDetails(this.shiftId).subscribe((res) => {
    //   console.log(res)
    // })
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


  viewStaffProfile(id: number){
    this.router.navigate(['staff-profile', id])
  }


}
