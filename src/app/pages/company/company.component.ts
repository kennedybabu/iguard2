import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { AddShiftComponent } from 'src/app/components/company/add-shift/add-shift.component';
import { CreateCompanyDeptComponent } from 'src/app/components/company/create-company-dept/create-company-dept.component';
import { CreateCompanySettingsComponent } from 'src/app/components/company/create-company-settings/create-company-settings.component';
import { Department } from 'src/app/model/department';
import { GetCompanyAttendanceService } from 'src/app/services/company/get-company-attendance.service';
import { GetCompanyDeptsService } from 'src/app/services/company/get-company-depts.service';
import { GetCompanyDesignationsService } from 'src/app/services/company/get-company-designations.service';
import { GetCompanyDetailsService } from 'src/app/services/company/get-company-details.service';
import { GetCompanySettingsService } from 'src/app/services/company/get-company-settings.service';
import { CurrentPremiseService } from 'src/app/services/shared/current-premise.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements AfterViewInit, OnInit {


  companyId!: number
  companyDepartments: Department [] = []
  currentPremise!: any
  companyObject!: any
  companyDesignations: any [] = []

  constructor(
    private route: ActivatedRoute,
    private getCompanyDepartmentsService: GetCompanyDeptsService,
    private dialog:MatDialog,
    private currentPremiseService: CurrentPremiseService, 
    private getCompanyAtendanceService: GetCompanyAttendanceService,
    private getCompanyDetailsService: GetCompanyDetailsService,
    private getCompanyDesignationsService:GetCompanyDesignationsService,
    private getCompanySettingsService: GetCompanySettingsService
    ){
      this.currentPremiseService.premiseData$.subscribe((res) => {
        this.currentPremise = res
      })
    }


  displayedColumns: string[] = ['department_name', 'narration'];
  dataSource = new MatTableDataSource<Department>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.companyId = +params['id']
      }
    )

    this.getCompanyDepartmentsService.getDepartments(this.companyId).subscribe((res) => {
      this.companyDepartments = res.message
      this.dataSource.data = res.message
    })


    this.getCompanyDetailsService.getDetails(this.companyId).subscribe((res) => {
      this.companyObject = res.message 
      
    })


    this.getCompanyDesignationsService.getDesignations(this.companyId).subscribe((res) => {
      console.log(res)
      this.companyDesignations = res.message
    })

    this.getCompanyAtendanceService.getAttendance(this.companyId).subscribe((res) => {
      console.log(res)
    })


    this.getCompanySettingsService.getSettings(this.companyId).subscribe((res) => {
      console.log(res)
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

  createDepartment() {
    const dialogRef = this.dialog.open(CreateCompanyDeptComponent, {
      width:'450px', height: '400px', data: {
        companyId: this.companyId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCompanyDepartmentsService.getDepartments(this.companyId).subscribe((res) => {
        this.dataSource.data = res.message
      })
    });
  }


  createShift() {
    const dialogRef = this.dialog.open(AddShiftComponent, {
      width:'450px', height: '400px', data: {
        companyId: this.companyId,
        companyDepartments: this.companyDepartments
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }


  createSettings() {
    const dialogRef = this.dialog.open(CreateCompanySettingsComponent, {
      width:'450px', height: '400px', data: {
        companyId: this.companyId,
        companyDesignations: this.companyDesignations
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  createPremiseSettings() {
    const dialogRef = this.dialog.open(CreateCompanySettingsComponent, {
      width:'450px', data: {
        companyId: this.companyId,
        companyDesignations: this.companyDesignations
      }
    });

    dialogRef.afterClosed().subscribe(result => {
   
    });
  }

}
