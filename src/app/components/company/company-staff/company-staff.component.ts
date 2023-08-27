import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Staff } from 'src/app/model/staff';
import { GetCompanyStaffService } from 'src/app/services/company/get-company-staff.service';

@Component({
  selector: 'app-company-staff',
  templateUrl: './company-staff.component.html',
  styleUrls: ['./company-staff.component.scss']
})
export class CompanyStaffComponent implements OnInit, AfterViewInit {

  @Input() companyId!: number

  constructor(
    private getCompanyStaffService:GetCompanyStaffService,
    private router:Router
    ){}

  displayedColumns: string[] = ['firstName', 'msisdn', 'email', 'designation'];
  dataSource = new MatTableDataSource<Staff>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getCompanyStaffService.getStaff(this.companyId).subscribe((res) => { 
      console.log(res)
      this.dataSource.data = res.message
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


  viewStaffProfile(id: number){
    this.router.navigate(['staff-profile', id])
  }


}
