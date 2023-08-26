import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { Department } from 'src/app/model/department';
import { Staff } from 'src/app/model/staff';
import { GetCompanyDeptsService } from 'src/app/services/company/get-company-depts.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements AfterViewInit, OnInit {


  companyId!: number
  companyDepartments: Department [] = []

  constructor(
    private route: ActivatedRoute,
    private getCompanyDepartmentsService: GetCompanyDeptsService){}


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

}
