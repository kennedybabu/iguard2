import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Staff } from 'src/app/model/staff';
import { GetCompanyStaffService } from 'src/app/services/company/get-company-staff.service';
import { CreateStaffComponent } from '../create-staff/create-staff.component';
import { MatDialog } from '@angular/material/dialog';
import { GetCompanyDeptsService } from 'src/app/services/company/get-company-depts.service';

@Component({
  selector: 'app-company-staff',
  templateUrl: './company-staff.component.html',
  styleUrls: ['./company-staff.component.scss']
})
export class CompanyStaffComponent implements OnInit, AfterViewInit {

  @Input() companyId!: number
  @Input() companyDesignations: any [] = []
  companyDepts: any [] = []

  constructor(
    private getCompanyStaffService:GetCompanyStaffService,
    private router:Router,
    private dialog: MatDialog,
    private getCompanyDeptsService: GetCompanyDeptsService
    ){}

  displayedColumns: string[] = ['firstName', 'msisdn', 'email', 'designation'];
  dataSource = new MatTableDataSource<Staff>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getCompanyStaffService.getStaff(this.companyId).subscribe((res) => { 
      this.dataSource.data = res.message
    })

    this.getCompanyDeptsService.getDepartments(this.companyId).subscribe((res) => {
      this.companyDepts = res.message
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


  // createStaff 

  createStaff() {
    const dialogRef = this.dialog.open(CreateStaffComponent, {
      width:'450px', height: '600px', data: {
        companyId: this.companyId,
        companyDepts: this.companyDepts,
        companyDesignations: this.companyDesignations

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCompanyStaffService.getStaff(this.companyId).subscribe((res) => { 
        this.dataSource.data = res.message
      })
    });
  }


}
