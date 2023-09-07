import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { GetDepartmentDesignationsService } from 'src/app/services/company/get-department-designations.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  departmentId!: number


  constructor(private getDepartmentDesignationsService:GetDepartmentDesignationsService,
    private route:ActivatedRoute){}

  displayedColumns: string[] = ['name', 'description'];
  dataSource = new MatTableDataSource<null>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.departmentId = +params['id']
      }
    )


    this.getDepartmentDesignationsService.getDesignations(this.departmentId).subscribe((res) => {
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
